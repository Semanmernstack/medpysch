// lib/data/vectorstore.ts
// import { PineconeStore } from "@langchain/pinecone";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// export async function indexDocuments(documents: Document[]) {
//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 600,
//     chunkOverlap: 20
//   });
  
//   const chunks = await splitter.splitDocuments(documents);
  
//   const embeddings = new OpenAIEmbeddings({
//     modelName: "text-embedding-3-small"
//   });
  
//   await PineconeStore.fromDocuments(
//     chunks,
//     embeddings,
//     { pineconeIndex: index }
//   );
// }

// export async function searchRelevantContext(
//   query: string,
//   k: number = 3
// ): Promise<Document[]> {
  // Semantic search through 10k pages
  // Returns relevant chunks
//}
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { getPineconeIndex } from '../ai/pinecone';

export class MedicalVectorStore {
  private embeddings: OpenAIEmbeddings;
  private textSplitter: RecursiveCharacterTextSplitter;

  constructor() {
    this.embeddings = new OpenAIEmbeddings({
      modelName: 'text-embedding-3-small',
      openAIApiKey: process.env.OPENAI_API_KEY!,
    });

    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 600,
      chunkOverlap: 20,
      separators: ['\n\n', '\n', '. ', ' ', ''],
    });
  }

  /**
   * Chunk documents into smaller pieces
   */
  async chunkDocuments(documents: Document[]): Promise<Document[]> {
    console.log(`📄 Chunking ${documents.length} documents...`);
    const chunks = await this.textSplitter.splitDocuments(documents);
    console.log(`✅ Created ${chunks.length} chunks`);
    return chunks;
  }

  /**
   * Upload documents to Pinecone
   */
  async uploadDocuments(documents: Document[]): Promise<void> {
    try {
      console.log('🚀 Starting upload to Pinecone...');
      
      const chunks = await this.chunkDocuments(documents);
      const pineconeIndex = await getPineconeIndex();

      await PineconeStore.fromDocuments(chunks, this.embeddings, {
        pineconeIndex,
        namespace: '',
      });

      console.log('✅ Upload complete!');
    } catch (error) {
      console.error('❌ Upload failed:', error);
      throw error;
    }
  }

  /**
   * Search for relevant context
   */
  async searchDocuments(
    query: string,
    topK: number = 3
  ): Promise<Document[]> {
    try {
      const pineconeIndex = await getPineconeIndex();
      
      const vectorStore = await PineconeStore.fromExistingIndex(
        this.embeddings,
        { pineconeIndex, namespace: '' }
      );

      const results = await vectorStore.similaritySearch(query, topK);
      return results;
    } catch (error) {
      console.error(' Search failed:', error);
      return [];
    }
  }
}