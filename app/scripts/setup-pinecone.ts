import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function setupPinecone() {
  console.log(' Setting up Pinecone...\n');

  try {
    // Initialize Pinecone
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });

    const indexName = process.env.PINECONE_INDEX_NAME || 'medical-cases';

    console.log(`📋 Checking if index "${indexName}" exists...`);

    // Check if index already exists
    const existingIndexes = await pinecone.listIndexes();
    const indexExists = existingIndexes.indexes?.some(
      (index) => index.name === indexName
    );

    if (indexExists) {
      console.log(`✅ Index "${indexName}" already exists!`);
      console.log('   You can start uploading documents.');
      return;
    }

    // Create new index
    console.log(`📝 Creating index "${indexName}"...`);

    await pinecone.createIndex({
      name: indexName,
      dimension: 1536, // OpenAI text-embedding-3-small dimension
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1',
        },
      },
    });

    console.log('⏳ Waiting for index to be ready...');
    
    // Wait for index to be ready (can take a minute)
    await new Promise((resolve) => setTimeout(resolve, 60000));

    console.log('\n✅ Pinecone setup complete!');
    console.log(`📦 Index "${indexName}" is ready for documents.\n`);
    console.log('Next steps:');
    console.log('  1. Add your PDFs to data/medical-documents/');
    console.log('  2. Run: npm run upload-documents');
  } catch (error) {
    console.error(' Error setting up Pinecone:', error);
    process.exit(1);
  }
}

setupPinecone();