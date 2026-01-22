
import { Document } from "@langchain/core/documents";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { PineconeStore } from '@langchain/pinecone';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { getPineconeIndex } from '../ai/pinecone';

export class MedicalVectorStore {
  private embeddings: HuggingFaceInferenceEmbeddings;
  private textSplitter: RecursiveCharacterTextSplitter;

  constructor() {
    // Initialize Hugging Face embeddings
    this.embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGINGFACE_API_KEY!, // Make sure to set this in your .env
      model: "sentence-transformers/all-MiniLM-L6-v2", // Popular embedding model
      // Alternative models you can use:
      // model: "BAAI/bge-small-en-v1.5" - Better quality
      // model: "intfloat/e5-small-v2" - Good balance
      // model: "sentence-transformers/all-mpnet-base-v2" - Higher quality but slower
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
      console.error('❌ Search failed:', error);
      return [];
    }
  }

  /**
   * Search with similarity scores
   */
  async searchWithScores(
    query: string,
    topK: number = 3
  ): Promise<[Document, number][]> {
    try {
      const pineconeIndex = await getPineconeIndex();
      
      const vectorStore = await PineconeStore.fromExistingIndex(
        this.embeddings,
        { pineconeIndex, namespace: '' }
      );

      const results = await vectorStore.similaritySearchWithScore(query, topK);
      return results;
    } catch (error) {
      console.error(' Search with scores failed:', error);
      return [];
    }
  }
}