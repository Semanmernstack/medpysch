
// import { Pinecone } from '@pinecone-database/pinecone';
// import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';

// // Hardcoded API keys - no environment variables
// const pc = new Pinecone({
//   apiKey: 'pcsk_3SmAN6_7wSpbvrkTFzMGVJqRajwQZQBEHrjYmSpLYWcNxgcAzc6R2XxqcNdJsENZVjaqRL',
// });

// const embeddings = new HuggingFaceInferenceEmbeddings({
//   apiKey: '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',
//   model: 'sentence-transformers/all-MiniLM-L6-v2',
// });

// const indexName = 'exam';

// export interface RAGResult {
//   content: string;
//   metadata: any;
//   relevance_score: number;
// }

// /**
//  * Search for relevant context from Pinecone vector database
//  */
// export async function searchRelevantContext(
//   query: string,
//   caseId: string,
//   topK: number = 3
// ): Promise<RAGResult[]> {
//   try {
//     console.log('🔍 Searching RAG for:', query);

//     // Get query embedding from HuggingFace
//     const queryEmbedding = await embeddings.embedQuery(query);

//     // Search Pinecone
//     const index = pc.index(indexName);
//     const queryResponse = await index.query({
//       vector: queryEmbedding,
//       topK,
//       filter: { case_id: { $eq: caseId } },
//       includeMetadata: true,
//     });

//     // Format results - ensure content is always a string
//     const results: RAGResult[] = queryResponse.matches.map((match) => ({
//       content: String(match.metadata?.text || ''),  // Convert to string
//       metadata: match.metadata || {},
//       relevance_score: match.score || 0,
//     }));

//     console.log(`✅ Found ${results.length} relevant documents`);
//     return results;
//   } catch (error) {
//     console.error('❌ RAG search error:', error);
//     return [];
//   }
// }

// /**
//  * Add documents to Pinecone (for initial setup)
//  */
// export async function addDocumentsToPinecone(
//   documents: Array<{
//     text: string;
//     metadata: any;
//   }>
// ): Promise<void> {
//   try {
//     console.log('📝 Adding documents to Pinecone...');

//     const index = pc.index(indexName);

//     // Generate embeddings for all documents
//     const vectors = [];
//     for (let i = 0; i < documents.length; i++) {
//       const doc = documents[i];
//       const embedding = await embeddings.embedQuery(doc.text);
      
//       vectors.push({
//         id: `doc-${Date.now()}-${i}`,
//         values: embedding,
//         metadata: {
//           text: doc.text,
//           ...doc.metadata,
//         },
//       });
//     }

//     // Upsert to Pinecone
//     await index.upsert(vectors);

//     console.log(`✅ Added ${vectors.length} documents to Pinecone`);
//   } catch (error) {
//     console.error('❌ Failed to add documents:', error);
//     throw error;
//   }
// }
import { Pinecone } from '@pinecone-database/pinecone';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';

// Hardcoded API keys - no environment variables
const pc = new Pinecone({
  apiKey: 'pcsk_3SmAN6_7wSpbvrkTFzMGVJqRajwQZQBEHrjYmSpLYWcNxgcAzc6R2XxqcNdJsENZVjaqRL',
});

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: ' 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',
  model: 'sentence-transformers/all-MiniLM-L6-v2',
});

const indexName = 'exam';

export interface RAGResult {
  content: string;
  metadata: any;
  relevance_score: number;
}

/**
 * Search for relevant context from Pinecone vector database
 */
export async function searchRelevantContext(
  query: string,
  caseId: string,
  topK: number = 3
): Promise<RAGResult[]> {
  try {
    console.log('🔍 Searching RAG for:', query);

    // Get query embedding from HuggingFace
    const queryEmbedding = await embeddings.embedQuery(query);

    // Search Pinecone
    const index = pc.index(indexName);
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK,
      filter: { case_id: { $eq: caseId } },
      includeMetadata: true,
    });

    // Format results - ensure content is always a string
    const results: RAGResult[] = queryResponse.matches.map((match) => ({
      content: String(match.metadata?.text || ''),  // Convert to string
      metadata: match.metadata || {},
      relevance_score: match.score || 0,
    }));

    console.log(`✅ Found ${results.length} relevant documents`);
    return results;
  } catch (error) {
    console.error('❌ RAG search error:', error);
    return [];
  }
}

/**
 * Add documents to Pinecone (for initial setup)
 * FIXED: Chunks documents to avoid metadata size limit
 */
export async function addDocumentsToPinecone(
  documents: Array<{
    text: string;
    metadata: any;
  }>
): Promise<void> {
  try {
    console.log('📝 Adding documents to Pinecone...');

    const index = pc.index(indexName);
    
    // CHUNK the documents first - each chunk max 1000 characters
    const chunks = [];
    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      const text = doc.text;
      
      // Split into 1000 character chunks
      for (let start = 0; start < text.length; start += 1000) {
        const chunk = text.substring(start, Math.min(start + 1000, text.length));
        chunks.push({
          text: chunk,
          metadata: {
            source: doc.metadata.source || 'unknown',
            specialty: doc.metadata.specialty || 'general',
            type: doc.metadata.type || 'medical_document',
            case_id: doc.metadata.case_id || 'general',
            chunk_index: Math.floor(start / 1000),
          }
        });
      }
    }

    console.log(`📦 Created ${chunks.length} chunks from ${documents.length} documents`);

    // Generate embeddings for chunks
    const vectors = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embedding = await embeddings.embedQuery(chunk.text);
      
      console.log(`📊 Chunk ${i + 1}/${chunks.length} - Text: ${chunk.text.length} chars, Metadata: ${JSON.stringify(chunk.metadata).length} bytes`);
      
      vectors.push({
        id: `doc-${Date.now()}-${i}`,
        values: embedding,
        metadata: {
          text: chunk.text, // Store chunk text here (not full document)
          ...chunk.metadata,
        },
      });
    }

    // Upsert to Pinecone in batches of 100 to avoid rate limits
    const batchSize = 100;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await index.upsert(batch);
      console.log(`✅ Uploaded batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(vectors.length / batchSize)}`);
    }

    console.log(`✅ Added ${vectors.length} chunks to Pinecone`);
  } catch (error) {
    console.error('❌ Failed to add documents:', error);
    throw error;
  }
}
