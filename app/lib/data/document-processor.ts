
// import { Document } from "@langchain/core/documents";
// import fs from "fs";
// import path from "path";

// export class DocumentProcessor {
//   private documentsPath: string;

//   constructor() {
//     this.documentsPath = path.join(
//       process.cwd(),
//       "data",
//       "medical-documents"
//     );
//   }

//   /**
//    * Get all PDF files recursively
//    */
//   private getAllPDFs(dir: string): string[] {
//     let files: string[] = [];

//     const items = fs.readdirSync(dir);

//     for (const item of items) {
//       const fullPath = path.join(dir, item);
//       const stat = fs.statSync(fullPath);

//       if (stat.isDirectory()) {
//         files = files.concat(this.getAllPDFs(fullPath));
//       } else if (item.toLowerCase().endsWith(".pdf")) {
//         files.push(fullPath);
//       }
//     }

//     return files;
//   }

//   /**
//    * Extract text from PDF using pdfjs-dist
//    */
//   private async extractTextFromPDF(filePath: string): Promise<string> {
//     try {
//       const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
      
//       const dataBuffer = fs.readFileSync(filePath);
//       const typedArray = new Uint8Array(dataBuffer);
      
//       const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
      
//       let fullText = "";
      
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         const pageText = textContent.items
//           .map((item: any) => item.str)
//           .join(" ");
//         fullText += pageText + "\n";
//       }
      
//       return fullText;
//     } catch (error) {
//       console.error(`❌ Error reading ${filePath}:`, error);
//       return "";
//     }
//   }

//   /**
//    * Process all PDFs in the documents folder
//    */
//   async processAllDocuments(): Promise<Document[]> {
//     console.log("📚 Processing medical documents...");

//     if (!fs.existsSync(this.documentsPath)) {
//       console.log("⚠️ Documents folder not found. Creating it...");
//       fs.mkdirSync(this.documentsPath, { recursive: true });
//       console.log("✅ Created: data/medical-documents/");
//       console.log("📌 Add PDFs and run again.");
//       return [];
//     }

//     const pdfFiles = this.getAllPDFs(this.documentsPath);

//     if (pdfFiles.length === 0) {
//       console.log("⚠️ No PDF files found.");
//       console.log("📌 Add PDFs (pp.pdf, jj.pdf, etc.) and run again.");
//       return [];
//     }

//     console.log(`📄 Found ${pdfFiles.length} PDF files`);

//     const documents: Document[] = [];

//     for (const filePath of pdfFiles) {
//       const fileName = path.basename(filePath);
//       const relativePath = path.relative(this.documentsPath, filePath);
//       const specialty =
//         path.dirname(relativePath).split(path.sep)[0] || "general";

//       console.log(`📖 Processing: ${fileName}`);

//       const text = await this.extractTextFromPDF(filePath);

//       if (text.trim().length > 0) {
//         documents.push(
//           new Document({
//             pageContent: text,
//             metadata: {
//               source: fileName,
//               filePath: relativePath,
//               specialty,
//               type: "medical_document",
//             },
//           })
//         );

//         console.log(`✅ Extracted ${text.length} characters`);
//       } else {
//         console.log(`⚠️ No text extracted from ${fileName}`);
//       }
//     }

//     console.log(`\n✅ Processed ${documents.length} documents successfully`);
//     return documents;
//   }

//   /**
//    * Get statistics about processed documents
//    */
//   getDocumentStats(documents: Document[]): {
//     totalDocuments: number;
//     totalCharacters: number;
//     averageSize: number;
//     specialties: string[];
//   } {
//     const totalChars = documents.reduce(
//       (sum, doc) => sum + doc.pageContent.length,
//       0
//     );

//     const specialties = Array.from(
//       new Set(documents.map((doc) => doc.metadata.specialty))
//     );

//     return {
//       totalDocuments: documents.length,
//       totalCharacters: totalChars,
//       averageSize:
//         documents.length > 0
//           ? Math.round(totalChars / documents.length)
//           : 0,
//       specialties,
//     };
//   }
// }
import { Document } from "@langchain/core/documents";
import fs from "fs";
import path from "path";

export class DocumentProcessor {
  private documentsPath: string;

  constructor() {
    this.documentsPath = path.join(
      process.cwd(),
      "data",
      "medical-documents"
    );
  }

  /**
   * Get all TXT files recursively
   */
  private getAllTextFiles(dir: string): string[] {
    let files: string[] = [];

    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files = files.concat(this.getAllTextFiles(fullPath));
      } else if (item.toLowerCase().endsWith(".txt")) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * Extract text from TXT file - simple and reliable
   */
  private async extractTextFromFile(filePath: string): Promise<string> {
    try {
      const text = fs.readFileSync(filePath, "utf-8");
      return text || "";
    } catch (error) {
      console.error(`❌ Error reading ${filePath}:`, error);
      return "";
    }
  }

  /**
   * Process all text files in the documents folder
   */
  async processAllDocuments(): Promise<Document[]> {
    console.log("📚 Processing medical documents...");

    if (!fs.existsSync(this.documentsPath)) {
      console.log("⚠️ Documents folder not found. Creating it...");
      fs.mkdirSync(this.documentsPath, { recursive: true });
      console.log("✅ Created: data/medical-documents/");
      console.log("📌 Add .txt files and run again.");
      return [];
    }

    const textFiles = this.getAllTextFiles(this.documentsPath);

    if (textFiles.length === 0) {
      console.log("⚠️ No .txt files found.");
      console.log("📌 Convert your PDFs to .txt files first:");
      console.log("   - Use any online PDF to text converter");
      console.log("   - Save as .txt in data/medical-documents/");
      console.log("   - Then refresh the page");
      return [];
    }

    console.log(`📄 Found ${textFiles.length} text files`);

    const documents: Document[] = [];

    for (const filePath of textFiles) {
      const fileName = path.basename(filePath);
      const relativePath = path.relative(this.documentsPath, filePath);
      const specialty =
        path.dirname(relativePath).split(path.sep)[0] || "general";

      console.log(`📖 Processing: ${fileName}`);

      const text = await this.extractTextFromFile(filePath);

      if (text.trim().length > 0) {
        documents.push(
          new Document({
            pageContent: text,
            metadata: {
              source: fileName,
              filePath: relativePath,
              specialty,
              type: "medical_document",
            },
          })
        );

        console.log(`✅ Extracted ${text.length} characters`);
      } else {
        console.log(`⚠️ No text extracted from ${fileName}`);
      }
    }

    console.log(`\n✅ Processed ${documents.length} documents successfully`);
    return documents;
  }

  /**
   * Get statistics about processed documents
   */
  getDocumentStats(documents: Document[]): {
    totalDocuments: number;
    totalCharacters: number;
    averageSize: number;
    specialties: string[];
  } {
    const totalChars = documents.reduce(
      (sum, doc) => sum + doc.pageContent.length,
      0
    );

    const specialties = Array.from(
      new Set(documents.map((doc) => doc.metadata.specialty))
    );

    return {
      totalDocuments: documents.length,
      totalCharacters: totalChars,
      averageSize:
        documents.length > 0
          ? Math.round(totalChars / documents.length)
          : 0,
      specialties,
    };
  }
}