import { createEmbedding } from './openai';
import { queryPinecone } from './pinecone';
import { RAGContext } from '../types';

export async function searchRelevantContext(
  query: string,
  caseId?: string,
  topK: number = 3
): Promise<RAGContext[]> {
  try {
    // Create embedding for the query
    const queryEmbedding = await createEmbedding(query);

    // Build filter if case ID provided
    const filter = caseId ? { case_id: caseId } : undefined;

    // Query Pinecone
    const results = await queryPinecone(queryEmbedding, topK, filter);

    // Format results
    return results.map((result: any) => ({
      content: result.metadata?.text || '',
      metadata: {
        case_id: result.metadata?.case_id || '',
        specialty: result.metadata?.specialty || '',
        source: result.metadata?.source || 'document',
      },
      relevance_score: result.score || 0,
    }));
  } catch (error) {
    console.error('RAG search error:', error);
    return [];
  }
}

export async function searchMultipleQueries(
  queries: string[],
  caseId?: string,
  topKPerQuery: number = 2
): Promise<RAGContext[]> {
  const allResults = await Promise.all(
    queries.map((query) => searchRelevantContext(query, caseId, topKPerQuery))
  );

  // Flatten and deduplicate
  const flatResults = allResults.flat();
  const uniqueResults = Array.from(
    new Map(flatResults.map((item) => [item.content, item])).values()
  );

  // Sort by relevance
  return uniqueResults.sort((a, b) => b.relevance_score - a.relevance_score);
}