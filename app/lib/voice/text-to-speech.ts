// Text-to-speech using browser API (free, works immediately)
export class TextToSpeech {
  private synthesis: SpeechSynthesis | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    }
  }

  isSupported(): boolean {
    return !!this.synthesis;
  }
  speak(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
  }
): void {
  if (!this.synthesis) {
    console.error('Text-to-speech not supported');
    return;
  }

  // Check if text is valid
  if (!text || typeof text !== 'string') {
    console.error('Invalid text provided to speak:', text);
    return;
  }

  // Stop any ongoing speech
  this.stop();

  // Remove emotion markers like [speaking slowly], [tearful], etc.
  const cleanText = text.replace(/\[.*?\]/g, '');
//   speak(
//     text: string,
//     options?: {
//       rate?: number;
//       pitch?: number;
//       volume?: number;
//       onEnd?: () => void;
//     }
//   ): void {
//     if (!this.synthesis) {
//       console.error('Text-to-speech not supported');
//       return;
//     }

//     // Stop any ongoing speech
//     this.stop();

//     // Remove emotion markers like [speaking slowly], [tearful], etc.
//     const cleanText = text.replace(/\[.*?\]/g, '');

    this.utterance = new SpeechSynthesisUtterance(cleanText);

    // Configure voice settings for emotional tone
    this.utterance.rate = options?.rate || 0.9;
    this.utterance.pitch = options?.pitch || 1.0;
    this.utterance.volume = options?.volume || 1.0;

    // Try to select a female voice for patient
    const voices = this.synthesis.getVoices();
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.includes('Female') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria')
    );

    if (femaleVoice) {
      this.utterance.voice = femaleVoice;
    }

    this.utterance.onstart = () => {
      this.isSpeaking = true;
    };

    this.utterance.onend = () => {
      this.isSpeaking = false;
      if (options?.onEnd) {
        options.onEnd();
      }
    };

    this.utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.isSpeaking = false;
    };

    this.synthesis.speak(this.utterance);
  }

  stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  // Adjust speech based on emotional state
  speakWithEmotion(text: string, emotionalState: string): void {
    let rate = 0.9;
    let pitch = 1.0;

    // Adjust voice based on emotion
    if (emotionalState.toLowerCase().includes('sad') || 
        emotionalState.toLowerCase().includes('depressed') ||
        emotionalState.toLowerCase().includes('low')) {
      rate = 0.75; // Slower for sadness
      pitch = 0.9; // Lower pitch
    } else if (emotionalState.toLowerCase().includes('anxious') ||
               emotionalState.toLowerCase().includes('panic')) {
      rate = 1.1; // Faster for anxiety
      pitch = 1.1; // Higher pitch
    } else if (emotionalState.toLowerCase().includes('pain') ||
               emotionalState.toLowerCase().includes('distress')) {
      rate = 0.8; // Slower, strained
      pitch = 0.95;
    }

    this.speak(text, { rate, pitch, volume: 1.0 });
  }
}