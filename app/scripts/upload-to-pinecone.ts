
import { addDocumentsToPinecone } from '../lib/ai/rag-search';
import { DocumentProcessor } from '../lib/data/document-processor';


async function uploadDocumentsToPinecone() {
  try {
    console.log('🚀 Starting PDF upload process...\n');

    // Step 1: Process PDFs
    const processor = new DocumentProcessor();
    const documents = await processor.processAllDocuments();

    if (documents.length === 0) {
      console.log('❌ No documents to upload. Add PDFs to data/medical-documents/ first.');
      return;
    }

    // Step 2: Get statistics
    const stats = processor.getDocumentStats(documents);
    console.log('\n📊 Document Statistics:');
    console.log(`   Total Documents: ${stats.totalDocuments}`);
    console.log(`   Total Characters: ${stats.totalCharacters.toLocaleString()}`);
    console.log(`   Average Size: ${stats.averageSize.toLocaleString()} characters`);
    console.log(`   Specialties: ${stats.specialties.join(', ')}\n`);

    // Step 3: Prepare documents for Pinecone
    const pineconeDocuments = documents.map((doc, index) => ({
      text: doc.pageContent,
      metadata: {
        ...doc.metadata,
        case_id: doc.metadata.specialty || 'general', // Use specialty as case_id or set your own
        document_index: index,
      },
    }));

    console.log(`📤 Uploading ${pineconeDocuments.length} documents to Pinecone...\n`);

    // Step 4: Upload to Pinecone
    await addDocumentsToPinecone(pineconeDocuments);

    console.log('\n✅ Upload complete! Your documents are now searchable in Pinecone.');
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

// Run the upload
uploadDocumentsToPinecone();