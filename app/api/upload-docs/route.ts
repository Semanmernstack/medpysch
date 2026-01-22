export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';


import { DocumentProcessor } from '@/app/lib/data/document-processor';
import { addDocumentsToPinecone } from '@/app/lib/ai/rag-search';

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Starting document upload process...');

    // Step 1: Process TXT files
    const processor = new DocumentProcessor();
    const documents = await processor.processAllDocuments();

    if (documents.length === 0) {
      return NextResponse.json({
        success: false,
        message: '❌ No documents to upload. Add TXT files to data/medical-documents/ first.',
      }, { status: 400 });
    }

    // Step 2: Get statistics
    const stats = processor.getDocumentStats(documents);
    console.log('📊 Document Statistics:', stats);

    // Step 3: Prepare documents for Pinecone with COMPREHENSIVE case_id assignment
    const pineconeDocuments = documents.map((doc, index) => {
      const content = doc.pageContent.toLowerCase();
      
      // Determine case_id dynamically based on comprehensive content keywords
      let caseId = 'GENERAL';
      
      // OCD (Postpartum)
      if (content.includes('ocd') || content.includes('obsessive') || 
          content.includes('compulsion') || content.includes('contamination') ||
          content.includes('postpartum') || content.includes('baby') && content.includes('cleaning')) {
        caseId = 'PSYCH_OCD_001';
      }
      // Autism / Asperger
      else if (content.includes('autism') || content.includes('asperger') || 
               content.includes('social communication') || content.includes('special interest') ||
               content.includes('sensory') || content.includes('routine') && content.includes('workplace')) {
        caseId = 'PSYCH_AUTISM_001';
      }
      // ADHD Child
      else if ((content.includes('adhd') || content.includes('attention deficit') || 
                content.includes('hyperactivity')) && 
               (content.includes('child') || content.includes('school') || content.includes('mum'))) {
        caseId = 'PSYCH_ADHD_CHILD_001';
      }
      // ADHD Adult
      else if ((content.includes('adhd') || content.includes('attention deficit')) && 
               content.includes('adult')) {
        caseId = 'PSYCH_ADHD_ADULT_001';
      }
      // Delirium
      else if (content.includes('delirium') || content.includes('acute confusion') ||
               content.includes('fluctuating') && content.includes('consciousness')) {
        caseId = 'PSYCH_DELIRIUM_001';
      }
      // Dementia Carer
      else if (content.includes('dementia') || content.includes('carer burden') || 
               content.includes('mrs. doe') || content.includes('vascular dementia') ||
               content.includes('zarit') || content.includes('caring for husband')) {
        caseId = 'PSYCH_DEMENTIA_001';
      }
      // PTSD
      else if (content.includes('ptsd') || content.includes('post-traumatic') ||
               content.includes('trauma') || content.includes('flashback') ||
               content.includes('hypervigilant') || content.includes('intrusive memories')) {
        caseId = 'PSYCH_PTSD_001';
      }
      // Specific Phobia - Driving
      else if (content.includes('phobia') && content.includes('driving') ||
               content.includes('fear of driving') || content.includes('steering wheel')) {
        caseId = 'PSYCH_PHOBIA_DRIVING_001';
      }
      // Social Phobia
      else if (content.includes('social phobia') || content.includes('social anxiety') ||
               content.includes('wedding') && content.includes('fear') ||
               content.includes('performance anxiety') || content.includes('embarrassment')) {
        caseId = 'PSYCH_SOCIAL_PHOBIA_001';
      }
      // Somatoform / Conversion
      else if (content.includes('somatoform') || content.includes('conversion') ||
               content.includes('chronic pain') || content.includes('paralysis') ||
               content.includes('somatic symptom')) {
        caseId = 'PSYCH_SOMATOFORM_001';
      }
      // Body Dysmorphic Disorder
      else if (content.includes('bdd') || content.includes('body dysmorphic') ||
               content.includes('preoccupation') && content.includes('appearance') ||
               content.includes('mirror checking')) {
        caseId = 'PSYCH_BDD_001';
      }
      // Bulimia
      else if (content.includes('bulimia') || content.includes('eating disorder') ||
               content.includes('binge') || content.includes('insulin omission') ||
               content.includes('diabulimia')) {
        caseId = 'PSYCH_BULIMIA_001';
      }
      // Schizophrenia Relapse Weight
      else if (content.includes('schizophrenia') && content.includes('relapse') ||
               content.includes('olanzapine') && content.includes('stopped')) {
        caseId = 'PSYCH_SCHIZO_WEIGHT_001';
      }
      // SSRI Sexual Dysfunction
      else if (content.includes('ssri') || content.includes('sexual dysfunction') || 
               content.includes('fluoxetine') || content.includes('erectile')) {
        caseId = 'PSYCH_SSRI_001';
      }
      // Weight Gain Assessment
      else if (content.includes('weight gain') && content.includes('psychosocial') ||
               content.includes('metabolic') && content.includes('olanzapine') ||
               content.includes('motivation') && content.includes('weight')) {
        caseId = 'PSYCH_WEIGHT_001';
      }
      
      console.log(`📝 Document "${doc.metadata.source}" assigned to case: ${caseId}`);
      
      return {
        text: doc.pageContent,
        metadata: {
          source: doc.metadata.source || 'unknown',
          specialty: 'Psychiatry',
          type: 'medical_document',
          case_id: caseId,
          document_index: index,
        },
      };
    });

    console.log(`📤 Uploading ${pineconeDocuments.length} documents to Pinecone...`);
    
    // Show distribution
    const distribution = pineconeDocuments.reduce((acc: any, doc) => {
      acc[doc.metadata.case_id] = (acc[doc.metadata.case_id] || 0) + 1;
      return acc;
    }, {});
    console.log(`📋 Case distribution:`, distribution);

    // Step 4: Upload to Pinecone
    await addDocumentsToPinecone(pineconeDocuments);

    console.log('✅ Upload complete!');

    return NextResponse.json({
      success: true,
      message: '✅ Upload complete! Your documents are now searchable in Pinecone.',
      stats: {
        totalDocuments: stats.totalDocuments,
        totalCharacters: stats.totalCharacters,
        averageSize: stats.averageSize,
        specialties: stats.specialties,
        uploaded: pineconeDocuments.length,
        caseDistribution: distribution,
      },
    });

  } catch (error: any) {
    console.error('❌ Upload failed:', error);
    return NextResponse.json({
      success: false,
      message: '❌ Upload failed',
      error: error.message || 'Unknown error',
    }, { status: 500 });
  }
}