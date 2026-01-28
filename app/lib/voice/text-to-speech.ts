// Text-to-speech using browser API (free, works immediately)
// export class TextToSpeech {
//   private synthesis: SpeechSynthesis | null = null;
//   private utterance: SpeechSynthesisUtterance | null = null;
//   private isSpeaking: boolean = false;

//   constructor() {
//     if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
//       this.synthesis = window.speechSynthesis;
//     }
//   }

//   isSupported(): boolean {
//     return !!this.synthesis;
//   }
//   speak(
//   text: string,
//   options?: {
//     rate?: number;
//     pitch?: number;
//     volume?: number;
//     onEnd?: () => void;
//   }
// ): void {
//   if (!this.synthesis) {
//     console.error('Text-to-speech not supported');
//     return;
//   }

//   // Check if text is valid
//   if (!text || typeof text !== 'string') {
//     console.error('Invalid text provided to speak:', text);
//     return;
//   }

//   // Stop any ongoing speech
//   this.stop();

//   // Remove emotion markers like [speaking slowly], [tearful], etc.
//   const cleanText = text.replace(/\[.*?\]/g, '');
// //   speak(
// //     text: string,
// //     options?: {
// //       rate?: number;
// //       pitch?: number;
// //       volume?: number;
// //       onEnd?: () => void;
// //     }
// //   ): void {
// //     if (!this.synthesis) {
// //       console.error('Text-to-speech not supported');
// //       return;
// //     }

// //     // Stop any ongoing speech
// //     this.stop();

// //     // Remove emotion markers like [speaking slowly], [tearful], etc.
// //     const cleanText = text.replace(/\[.*?\]/g, '');

//     this.utterance = new SpeechSynthesisUtterance(cleanText);

//     // Configure voice settings for emotional tone
//     this.utterance.rate = options?.rate || 0.9;
//     this.utterance.pitch = options?.pitch || 1.0;
//     this.utterance.volume = options?.volume || 1.0;

//     // Try to select a female voice for patient
//     const voices = this.synthesis.getVoices();
//     const femaleVoice = voices.find(
//       (voice) =>
//         voice.name.includes('Female') ||
//         voice.name.includes('Samantha') ||
//         voice.name.includes('Victoria')
//     );

//     if (femaleVoice) {
//       this.utterance.voice = femaleVoice;
//     }

//     this.utterance.onstart = () => {
//       this.isSpeaking = true;
//     };

//     this.utterance.onend = () => {
//       this.isSpeaking = false;
//       if (options?.onEnd) {
//         options.onEnd();
//       }
//     };

//     this.utterance.onerror = (event) => {
//       console.error('Speech synthesis error:', event);
//       this.isSpeaking = false;
//     };

//     this.synthesis.speak(this.utterance);
//   }

//   stop(): void {
//     if (this.synthesis) {
//       this.synthesis.cancel();
//       this.isSpeaking = false;
//     }
//   }

//   getIsSpeaking(): boolean {
//     return this.isSpeaking;
//   }

//   // Adjust speech based on emotional state
//   speakWithEmotion(text: string, emotionalState: string): void {
//     let rate = 0.9;
//     let pitch = 1.0;

//     // Adjust voice based on emotion
//     if (emotionalState.toLowerCase().includes('sad') || 
//         emotionalState.toLowerCase().includes('depressed') ||
//         emotionalState.toLowerCase().includes('low')) {
//       rate = 0.75; // Slower for sadness
//       pitch = 0.9; // Lower pitch
//     } else if (emotionalState.toLowerCase().includes('anxious') ||
//                emotionalState.toLowerCase().includes('panic')) {
//       rate = 1.1; // Faster for anxiety
//       pitch = 1.1; // Higher pitch
//     } else if (emotionalState.toLowerCase().includes('pain') ||
//                emotionalState.toLowerCase().includes('distress')) {
//       rate = 0.8; // Slower, strained
//       pitch = 0.95;
//     }

//     this.speak(text, { rate, pitch, volume: 1.0 });
//   }
export class TextToSpeech {
  private synthesis: SpeechSynthesis | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;
  private currentAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    }
  }

  isSupported(): boolean {
    return !!this.synthesis;
  }

  /**
   * Select appropriate OpenAI TTS voice based on patient profile
   */
  private selectVoice(age: number, gender: string): string {
    const genderLower = gender.toLowerCase();
    
    if (genderLower.includes('female') || genderLower.includes('woman')) {
      if (age >= 60) return 'shimmer'; // Elderly female - soft, gentle
      if (age >= 40) return 'shimmer'; // Middle-aged female
      return 'nova'; // Young female - warm, empathetic
    } else {
      if (age >= 60) return 'onyx'; // Elderly male - deep
      if (age >= 40) return 'onyx'; // Middle-aged male
      return 'echo'; // Young male - clear
    }
  }

  /**
   * Determine rate and pitch based on emotional state and age
   */
  private getVoiceParameters(emotionalState: string, age: number): { rate: number; pitch: number } {
    let rate = 0.9;
    let pitch = 1.0;

    // Adjust for emotion
    const stateLower = emotionalState.toLowerCase();
    
    if (stateLower.includes('anxious') || stateLower.includes('panic') || stateLower.includes('worried')) {
      rate = 1.1; // Faster for anxiety
      pitch = 1.1; // Higher pitch
    } else if (stateLower.includes('sad') || stateLower.includes('depressed') || stateLower.includes('low')) {
      rate = 0.75; // Slower for sadness
      pitch = 0.9; // Lower pitch
    } else if (stateLower.includes('angry') || stateLower.includes('frustrated') || stateLower.includes('irritated')) {
      rate = 1.15; // Fast for anger
      pitch = 1.05; // Slightly higher
    } else if (stateLower.includes('pain') || stateLower.includes('distress')) {
      rate = 0.8; // Slower, strained
      pitch = 0.95;
    } else if (stateLower.includes('manic') || stateLower.includes('excited')) {
      rate = 1.2; // Very fast
      pitch = 1.1; // Higher
    }

    // Adjust for age
    if (age >= 60) {
      rate *= 0.9; // Elderly speak slower
      pitch *= 0.95; // Lower pitch
    } else if (age <= 25) {
      rate *= 1.05; // Young speak slightly faster
    }

    return { rate, pitch };
  }

  /**
   * Speak using GPT-4o audio (via API call to backend)
   */
  async speakWithGPT4oAudio(
    text: string,
    patientProfile: {
      age: number;
      gender: string;
      emotionalState: string;
      name: string;
    }
  ): Promise<void> {
    try {
      // Stop any ongoing speech
      this.stop();

      // Clean text (remove emotion markers)
      const cleanText = text.replace(/\[.*?\]/g, '').trim();
      if (!cleanText) return;

      this.isSpeaking = true;

      // Select voice based on patient profile
      const voice = this.selectVoice(patientProfile.age, patientProfile.gender);

      console.log('🎙️ Generating GPT-4o audio...', {
        patient: patientProfile.name,
        voice,
        emotion: patientProfile.emotionalState
      });

      // Call backend API to generate audio
      const response = await fetch('/api/audio/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          voice: voice,
          patient_profile: patientProfile
        })
      });

      if (!response.ok) {
        throw new Error('Audio generation failed');
      }

      // Get audio blob
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Play audio
      this.currentAudio = new Audio(audioUrl);
      
      this.currentAudio.onended = () => {
        this.isSpeaking = false;
        URL.revokeObjectURL(audioUrl); // Clean up
      };

      this.currentAudio.onerror = (error) => {
        console.error('Audio playback error:', error);
        this.isSpeaking = false;
        URL.revokeObjectURL(audioUrl);
      };

      await this.currentAudio.play();
      console.log('✅ Playing GPT-4o audio');

    } catch (error) {
      console.error('❌ GPT-4o audio error:', error);
      this.isSpeaking = false;
      
      // Fallback to browser TTS
      console.log('⚠️ Falling back to browser TTS');
      const { rate, pitch } = this.getVoiceParameters(
        patientProfile.emotionalState,
        patientProfile.age
      );
      this.speak(text, { rate, pitch, volume: 1.0 });
    }
  }

  /**
   * Speak using browser TTS (fallback)
   */
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

  /**
   * Main method: Speak with emotion (tries GPT-4o, falls back to browser)
   */
  async speakWithEmotion(
    text: string,
    emotionalState: string,
    patientProfile?: { age: number; gender: string; name: string }
  ): Promise<void> {
    // If we have patient profile and API is configured, use GPT-4o audio
    if (patientProfile && process.env.NEXT_PUBLIC_USE_GPT4O_AUDIO === 'true') {
      await this.speakWithGPT4oAudio(text, {
        ...patientProfile,
        emotionalState
      });
    } else {
      // Fallback to browser TTS with emotion adjustments
      const { rate, pitch } = this.getVoiceParameters(
        emotionalState,
        patientProfile?.age || 30
      );
      this.speak(text, { rate, pitch, volume: 1.0 });
    }
  }

  stop(): void {
    // Stop browser TTS
    if (this.synthesis) {
      this.synthesis.cancel();
    }

    // Stop GPT-4o audio
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    this.isSpeaking = false;
  }

  getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}
}
