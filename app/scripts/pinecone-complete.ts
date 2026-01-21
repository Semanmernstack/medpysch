import { Pinecone } from '@pinecone-database/pinecone';

let pineconeClient: Pinecone | null = null;

export async function getPineconeClient(): Promise<Pinecone> {
  if (pineconeClient) {
    return pineconeClient;
  }

  pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  return pineconeClient;
}

export async function getPineconeIndex() {
  const client = await getPineconeClient();
  const indexName = process.env.PINECONE_INDEX_NAME || 'exam';
  
  return client.index(indexName);
}

export async function queryPinecone(
  embedding: number[],
  topK: number = 3,
  filter?: Record<string, any>
) {
  try {
    const index = await getPineconeIndex();
    
    const queryRequest: any = {
      vector: embedding,
      topK,
      includeMetadata: true,
    };

    if (filter) {
      queryRequest.filter = filter;
    }

    const queryResponse = await index.query(queryRequest);
    
    return queryResponse.matches || [];
  } catch (error) {
    console.error('❌ Pinecone query error:', error);
    return [];
  }
}

export async function upsertVectors(
  vectors: Array<{
    id: string;
    values: number[];
    metadata: Record<string, any>;
  }>
) {
  try {
    const index = await getPineconeIndex();
    await index.upsert(vectors);
    console.log(`✅ Upserted ${vectors.length} vectors to Pinecone`);
  } catch (error) {
    console.error('❌ Pinecone upsert error:', error);
    throw error;
  }
}