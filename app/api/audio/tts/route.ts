import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text, voice, patient_profile } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    console.log('🎙️ Generating TTS audio:', {
      voice,
      patient: patient_profile?.name,
      textLength: text.length
    });

    // Generate audio using OpenAI TTS
    const response = await openai.audio.speech.create({
      model: 'tts-1-hd', // High quality model
      voice: voice || 'nova', // Default to nova (warm female)
      input: text,
      speed: 1.0, // Normal speed (emotion handled by voice selection)
    });

    // Convert response to buffer
    const buffer = Buffer.from(await response.arrayBuffer());

    console.log('✅ Audio generated successfully');

    // Return audio as MP3
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('❌ TTS generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate audio' },
      { status: 500 }
    );
  }
}
