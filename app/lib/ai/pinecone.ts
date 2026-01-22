
// import { Pinecone } from '@pinecone-database/pinecone';

// // Hardcoded API keys - no environment variables
// const pineconeClient = new Pinecone({
//   apiKey: 'pcsk_3SmAN6_7wSpbvrkTFzMGVJqRajwQZQBEHrjYmSpLYWcNxgcAzc6R2XxqcNdJsENZVjaqRL',
// });

// const indexName = 'exam';

// export async function getPineconeClient(): Promise<Pinecone> {
//   return pineconeClient;
// }

// export async function getPineconeIndex() {
//   return pineconeClient.index(indexName);
// }

// export async function queryPinecone(
//   embedding: number[],
//   topK: number = 3,
//   filter?: Record<string, any>
// ): Promise<any[]> {
//   try {
//     const index = await getPineconeIndex();
    
//     const queryResponse = await index.query({
//       vector: embedding,
//       topK,
//       includeMetadata: true,
//       filter,
//     });

//     return queryResponse.matches || [];
//   } catch (error) {
//     console.error('Pinecone query error:', error);
//     throw new Error('Failed to query vector database');
//   }
// }
import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Pinecone client with environment variables
const pineconeClient = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const indexName = process.env.PINECONE_INDEX_NAME || 'exam';
const environment = process.env.PINECONE_ENVIRONMENT || 'us-east-1';

export async function getPineconeClient(): Promise<Pinecone> {
  return pineconeClient;
}

export async function getPineconeIndex() {
  return pineconeClient.index(indexName);
}

export async function queryPinecone(
  embedding: number[],
  topK: number = 3,
  filter?: Record<string, any>
): Promise<any[]> {
  try {
    const index = await getPineconeIndex();
    
    const queryResponse = await index.query({
      vector: embedding,
      topK,
      includeMetadata: true,
      filter,
    });

    return queryResponse.matches || [];
  } catch (error) {
    console.error('Pinecone query error:', error);
    throw new Error('Failed to query vector database');
  }
}