
// export class SpeechToText {
//   private recognition: any;
//   private isListening: boolean = false;
//   private onResultCallback: ((text: string) => void) | null = null;
//   private onEndCallback: (() => void) | null = null;
//   private finalTranscript: string = '';
//   private silenceTimer: NodeJS.Timeout | null = null;

//   constructor() {
//     if (typeof window !== 'undefined') {
//       const SpeechRecognition =
//         (window as any).SpeechRecognition ||
//         (window as any).webkitSpeechRecognition;

//       if (SpeechRecognition) {
//         this.recognition = new SpeechRecognition();
//         // Enable continuous mode to allow natural pauses
//         this.recognition.continuous = true;
//         // Enable interim results to capture speech as it happens
//         this.recognition.interimResults = true;
//         this.recognition.lang = 'en-US';
//         // Increase max alternatives for better accuracy
//         this.recognition.maxAlternatives = 1;

//         this.recognition.onresult = (event: any) => {
//           let interimTranscript = '';
          
//           // Process all results
//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             const transcript = event.results[i][0].transcript;
            
//             if (event.results[i].isFinal) {
//               // Add final results to our transcript
//               this.finalTranscript += transcript + ' ';
//             } else {
//               // Accumulate interim results
//               interimTranscript += transcript;
//             }
//           }

//           // Reset silence timer on each result
//           this.resetSilenceTimer();
//         };

//         this.recognition.onend = () => {
//           this.isListening = false;
          
//           // Clear silence timer
//           if (this.silenceTimer) {
//             clearTimeout(this.silenceTimer);
//             this.silenceTimer = null;
//           }

//           // Send final transcript if we have one
//           if (this.finalTranscript.trim() && this.onResultCallback) {
//             this.onResultCallback(this.finalTranscript.trim());
//           }
          
//           // Reset transcript
//           this.finalTranscript = '';

//           if (this.onEndCallback) {
//             this.onEndCallback();
//           }
//         };

//         this.recognition.onerror = (event: any) => {
//           console.error('Speech recognition error:', event.error);
//           this.isListening = false;
          
//           if (this.silenceTimer) {
//             clearTimeout(this.silenceTimer);
//             this.silenceTimer = null;
//           }
//         };
//       }
//     }
//   }

//   private resetSilenceTimer(): void {
//     // Clear existing timer
//     if (this.silenceTimer) {
//       clearTimeout(this.silenceTimer);
//     }

//     // Auto-stop after 1.5 seconds of silence (allows natural pauses)
//     this.silenceTimer = setTimeout(() => {
//       if (this.isListening) {
//         this.stopListening();
//       }
//     }, 1500);
//   }

//   isSupported(): boolean {
//     return !!this.recognition;
//   }

//   startListening(
//     onResult: (text: string) => void,
//     onEnd: () => void
//   ): void {
//     if (!this.recognition) {
//       console.error('Speech recognition not supported');
//       return;
//     }

//     this.onResultCallback = onResult;
//     this.onEndCallback = onEnd;
//     this.isListening = true;
//     this.finalTranscript = '';

//     try {
//       this.recognition.start();
//       // Start silence timer
//       this.resetSilenceTimer();
//     } catch (error) {
//       console.error('Error starting recognition:', error);
//       this.isListening = false;
//     }
//   }

//   stopListening(): void {
//     if (this.recognition && this.isListening) {
//       // Clear silence timer
//       if (this.silenceTimer) {
//         clearTimeout(this.silenceTimer);
//         this.silenceTimer = null;
//       }
      
//       this.recognition.stop();
//       this.isListening = false;
//     }
//   }

//   getIsListening(): boolean {
//     return this.isListening;
//   }
// }
export class SpeechToText {
  private recognition: any;
  private isListening: boolean = false;
  private onResultCallback: ((text: string) => void) | null = null;
  private finalTranscript: string = '';

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event: any) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              this.finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }
          if (this.onResultCallback) {
            this.onResultCallback(this.finalTranscript + interimTranscript);
          }
        };
      }
    }
  }

  startListening(onResult: (text: string) => void): void {
    if (!this.recognition) return;
    this.onResultCallback = onResult;
    this.isListening = true;
    this.finalTranscript = '';
    this.recognition.start();
  }

  stopListening(): string {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
    return this.finalTranscript.trim();
  }

  isSupported(): boolean { return !!this.recognition; }
}
