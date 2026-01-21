
// import OpenAI from 'openai';

// // Fallback to hardcoded key if environment variable isn't loaded
// // This is a workaround for Next.js environment variable loading issues on Windows
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY || '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',
// });

// export async function chat(
//   messages: Array<{ role: string; content: string }>,
//   temperature: number = 0.7,
//   model: string = 'gpt-4o'
// ): Promise<string> {
//   try {
//     const response = await openai.chat.completions.create({
//       model,
//       messages: messages as any,
//       temperature,
//       max_tokens: 500,
//     });

//     return response.choices[0]?.message?.content || '';
//   } catch (error) {
//     console.error('OpenAI API error:', error);
//     throw new Error('Failed to get AI response');
//   }
// }

// export async function chatWithJSON(
//   messages: Array<{ role: string; content: string }>,
//   schema: any,
//   temperature: number = 0.3
// ): Promise<any> {
//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-4o',
//       messages: messages as any,
//       temperature,
//       response_format: { type: 'json_object' },
//     });

//     const content = response.choices[0]?.message?.content || '{}';
//     return JSON.parse(content);
//   } catch (error) {
//     console.error('OpenAI JSON API error:', error);
//     throw new Error('Failed to get structured AI response');
//   }
// }

// export async function createEmbedding(text: string): Promise<number[]> {
//   try {
//     const response = await openai.embeddings.create({
//       model: 'text-embedding-3-small',
//       input: text,
//     });

//     return response.data[0].embedding;
//   } catch (error) {
//     console.error('OpenAI Embedding error:', error);
//     throw new Error('Failed to create embedding');
//   }
// }

// export { openai };
import OpenAI from 'openai';

// Hardcoded API kjey - no environment variables
const openai = new OpenAI({
 //apiKey: "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"
  apiKey: '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',
});

export async function chat(
  messages: Array<{ role: string; content: string }>,
  temperature: number = 0.7,
  model: string = 'gpt-4o'
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: messages as any,
      temperature,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get AI response');
  }
}

export async function chatWithJSON(
  messages: Array<{ role: string; content: string }>,
  schema: any,
  temperature: number = 0.3
): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages as any,
      temperature,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content || '{}';
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI JSON API error:', error);
    throw new Error('Failed to get structured AI response');
  }
}

export async function createEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('OpenAI Embedding error:', error);
    throw new Error('Failed to create embedding');
  }
}

export { openai };