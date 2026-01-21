// Speech-to-text using browser Web Speech API (free, works immediately)
export class SpeechToText {
  private recognition: any;
  private isListening: boolean = false;
  private onResultCallback: ((text: string) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (this.onResultCallback) {
            this.onResultCallback(transcript);
          }
        };

        this.recognition.onend = () => {
          this.isListening = false;
          if (this.onEndCallback) {
            this.onEndCallback();
          }
        };

        this.recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          this.isListening = false;
        };
      }
    }
  }

  isSupported(): boolean {
    return !!this.recognition;
  }

  startListening(
    onResult: (text: string) => void,
    onEnd: () => void
  ): void {
    if (!this.recognition) {
      console.error('Speech recognition not supported');
      return;
    }

    this.onResultCallback = onResult;
    this.onEndCallback = onEnd;
    this.isListening = true;

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      this.isListening = false;
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  getIsListening(): boolean {
    return this.isListening;
  }
}