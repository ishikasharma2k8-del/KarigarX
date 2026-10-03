import { ProductAnalysis, PublishedListing, SupportedLanguage } from '../types';

export const LANGUAGE_SPEECH_MAP: Record<SupportedLanguage, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  ta: 'ta-IN',
};

// Currently active audio playback instance
let activeAudio: HTMLAudioElement | null = null;

// Cached Web Speech voices
let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesLoadedPromise: Promise<SpeechSynthesisVoice[]> | null = null;

// Initialize and preload voices for fallback Web Speech API
export function preloadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve([]);
  }

  if (cachedVoices.length > 0) {
    return Promise.resolve(cachedVoices);
  }

  if (!voicesLoadedPromise) {
    voicesLoadedPromise = new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        cachedVoices = voices;
        resolve(voices);
        return;
      }

      const onVoicesChanged = () => {
        const loaded = window.speechSynthesis.getVoices();
        if (loaded && loaded.length > 0) {
          cachedVoices = loaded;
          window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
          resolve(loaded);
        }
      };

      window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);

      // Fallback timeout in case voiceschanged doesn't fire
      setTimeout(() => {
        const fallbackVoices = window.speechSynthesis.getVoices();
        cachedVoices = fallbackVoices || [];
        resolve(cachedVoices);
      }, 500);
    });
  }

  return voicesLoadedPromise;
}

// Immediately trigger preloading if in browser
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  preloadVoices();
}

/**
 * Finds the most natural, accurate Web Speech TTS voice for a given language.
 * Specially optimized for Telugu (te-IN) and Tamil (ta-IN) pronunciation.
 */
export function getBestVoiceForLanguage(lang: SupportedLanguage): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    return null;
  }

  const normalizedLang = lang.toLowerCase();

  // 1. TELUGU (te-IN) Voice Matching
  if (normalizedLang === 'te') {
    const exactMatch = voices.find(
      (v) =>
        v.lang.toLowerCase() === 'te-in' ||
        v.lang.toLowerCase() === 'te_in' ||
        v.lang.toLowerCase() === 'te'
    );
    if (exactMatch) return exactMatch;

    const nameOrCodeMatch = voices.find((v) => {
      const vLang = v.lang.toLowerCase();
      const vName = v.name.toLowerCase();
      return (
        vLang.startsWith('te-') ||
        vLang.startsWith('te_') ||
        vName.includes('telugu') ||
        vName.includes('తెలుగు') ||
        vName.includes('mohan') ||
        vName.includes('shruti') ||
        vName.includes('vani')
      );
    });
    if (nameOrCodeMatch) return nameOrCodeMatch;

    const indicFallback = voices.find((v) => {
      const vLang = v.lang.toLowerCase();
      const vName = v.name.toLowerCase();
      return (
        (vLang.includes('-in') || vLang.includes('_in')) &&
        (vName.includes('india') || vName.includes('indic') || vLang.startsWith('hi'))
      );
    });
    if (indicFallback) return indicFallback;
  }

  // 2. TAMIL (ta-IN) Voice Matching
  if (normalizedLang === 'ta') {
    const exactMatch = voices.find(
      (v) =>
        v.lang.toLowerCase() === 'ta-in' ||
        v.lang.toLowerCase() === 'ta_in' ||
        v.lang.toLowerCase() === 'ta' ||
        v.lang.toLowerCase() === 'ta-lk' ||
        v.lang.toLowerCase() === 'ta-sg'
    );
    if (exactMatch) return exactMatch;

    const nameOrCodeMatch = voices.find((v) => {
      const vLang = v.lang.toLowerCase();
      const vName = v.name.toLowerCase();
      return (
        vLang.startsWith('ta-') ||
        vLang.startsWith('ta_') ||
        vName.includes('tamil') ||
        vName.includes('தமிழ்') ||
        vName.includes('valluvar') ||
        vName.includes('latha') ||
        vName.includes('iniyaal') ||
        vName.includes('kavya')
      );
    });
    if (nameOrCodeMatch) return nameOrCodeMatch;

    const indicFallback = voices.find((v) => {
      const vLang = v.lang.toLowerCase();
      const vName = v.name.toLowerCase();
      return (
        (vLang.includes('-in') || vLang.includes('_in')) &&
        (vName.includes('india') || vName.includes('indic') || vLang.startsWith('hi'))
      );
    });
    if (indicFallback) return indicFallback;
  }

  // 3. HINDI (hi-IN) Voice Matching
  if (normalizedLang === 'hi') {
    const exactMatch = voices.find(
      (v) =>
        v.lang.toLowerCase() === 'hi-in' ||
        v.lang.toLowerCase() === 'hi_in' ||
        v.lang.toLowerCase() === 'hi'
    );
    if (exactMatch) return exactMatch;

    const nameOrCodeMatch = voices.find((v) => {
      const vLang = v.lang.toLowerCase();
      const vName = v.name.toLowerCase();
      return (
        vLang.startsWith('hi') ||
        vName.includes('hindi') ||
        vName.includes('हिन्दी') ||
        vName.includes('swara') ||
        vName.includes('madhur') ||
        vName.includes('kalpana')
      );
    });
    if (nameOrCodeMatch) return nameOrCodeMatch;
  }

  // 4. ENGLISH (en-IN) Voice Matching
  if (normalizedLang === 'en') {
    const indianEnglish = voices.find((v) => {
      const vLang = v.lang.toLowerCase();
      const vName = v.name.toLowerCase();
      return (
        vLang === 'en-in' ||
        vLang === 'en_in' ||
        (vLang.startsWith('en') &&
          (vName.includes('india') ||
            vName.includes('neerja') ||
            vName.includes('prabhat') ||
            vName.includes('ravi')))
      );
    });
    if (indianEnglish) return indianEnglish;

    const anyEnglish = voices.find((v) => v.lang.toLowerCase().startsWith('en'));
    if (anyEnglish) return anyEnglish;
  }

  return voices[0] || null;
}

// Keep-alive timer for Chrome SpeechSynthesis bug (stops long speech after ~15s)
let speechKeepAliveTimer: any = null;

function startSpeechKeepAlive() {
  stopSpeechKeepAlive();
  speechKeepAliveTimer = setInterval(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }
  }, 10000);
}

function stopSpeechKeepAlive() {
  if (speechKeepAliveTimer) {
    clearInterval(speechKeepAliveTimer);
    speechKeepAliveTimer = null;
  }
}

/**
 * Fallback to browser Web Speech API if server audio stream is unreachable
 */
function fallbackWebSpeech(
  text: string,
  lang: SupportedLanguage,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('[KarigarX TTS Fallback] Web Speech API is not supported in this browser.');
    if (onEnd) onEnd();
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const locale = LANGUAGE_SPEECH_MAP[lang] || 'en-IN';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale;
    utterance.volume = 1.0;
    utterance.pitch = 1.0;
    utterance.rate = lang === 'te' || lang === 'ta' ? 0.9 : 0.95;

    const matchedVoice = getBestVoiceForLanguage(lang);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
      utterance.lang = matchedVoice.lang || locale;
      console.log(`[KarigarX TTS Fallback] Using voice "${matchedVoice.name}" (${matchedVoice.lang}) for [${lang}]`);
    } else {
      console.warn(`[KarigarX TTS Fallback] No specific voice found for [${lang}], using browser default for locale [${locale}]`);
    }

    let hasEnded = false;
    const safeEnd = () => {
      if (!hasEnded) {
        hasEnded = true;
        stopSpeechKeepAlive();
        if (onEnd) onEnd();
      }
    };

    utterance.onstart = () => {
      console.log(`[KarigarX TTS Fallback] SpeechSynthesis onstart fired for [${lang}]`);
      startSpeechKeepAlive();
      if (onStart) onStart();
    };

    utterance.onend = () => {
      console.log(`[KarigarX TTS Fallback] SpeechSynthesis onend fired for [${lang}]`);
      safeEnd();
    };

    utterance.onerror = (e) => {
      console.warn(`[KarigarX TTS Fallback] SpeechSynthesis onerror fired for [${lang}]:`, e);
      safeEnd();
    };

    setTimeout(() => {
      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('[KarigarX TTS Fallback] Error in window.speechSynthesis.speak:', err);
        safeEnd();
      }
    }, 25);

    return true;
  } catch (err) {
    console.error('[KarigarX TTS Fallback] Failed to execute Web Speech synthesis:', err);
    if (onEnd) onEnd();
    return false;
  }
}

/**
 * Universal safe speech synthesizer with authentic native pronunciation for
 * Telugu (te-IN), Tamil (ta-IN), Hindi (hi-IN), and English (en-IN).
 * Uses high-fidelity server TTS stream with instant browser audio playback and seamless Web Speech fallback.
 */
export function playNaturalSpeech(
  text: string,
  lang: SupportedLanguage,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (!text || !text.trim()) {
    console.warn('[KarigarX TTS] Empty text passed to playNaturalSpeech');
    if (onEnd) onEnd();
    return false;
  }

  // 1. Stop any currently active speech/audio
  stopSpeech();

  const locale = LANGUAGE_SPEECH_MAP[lang] || 'en-IN';
  console.log(
    `[KarigarX TTS] Requesting speech synthesis. Lang: ${lang} | Locale: ${locale} | Characters: ${text.length}`
  );

  let hasStarted = false;
  let hasEnded = false;

  const triggerStart = () => {
    if (!hasStarted) {
      hasStarted = true;
      console.log(`[KarigarX TTS] Audio playback successfully started for [${lang} - ${locale}]`);
      if (onStart) onStart();
    }
  };

  const triggerEnd = () => {
    if (!hasEnded) {
      hasEnded = true;
      activeAudio = null;
      console.log(`[KarigarX TTS] Audio playback ended for [${lang} - ${locale}]`);
      if (onEnd) onEnd();
    }
  };

  // 2. Play via Server TTS API (Native Indian Pronunciation in original Telugu / Tamil script)
  try {
    const ttsUrl = `/api/tts?lang=${encodeURIComponent(locale)}&text=${encodeURIComponent(text.trim())}`;
    const audio = new Audio(ttsUrl);
    activeAudio = audio;

    audio.onplay = () => {
      triggerStart();
    };

    audio.onended = () => {
      triggerEnd();
    };

    audio.onerror = (e) => {
      console.warn(`[KarigarX TTS] HTML5 Audio error, switching to Web Speech fallback for [${lang}]:`, e);
      activeAudio = null;
      fallbackWebSpeech(text, lang, triggerStart, triggerEnd);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn(`[KarigarX TTS] Audio play() promise rejected, falling back to Web Speech API:`, err);
        activeAudio = null;
        fallbackWebSpeech(text, lang, triggerStart, triggerEnd);
      });
    }

    return true;
  } catch (err) {
    console.warn(`[KarigarX TTS] Error creating HTML5 Audio, using Web Speech fallback:`, err);
    return fallbackWebSpeech(text, lang, triggerStart, triggerEnd);
  }
}

// Stop any currently playing audio or browser speech synthesis
export function stopSpeech() {
  stopSpeechKeepAlive();

  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch (e) {
      // Ignore pause errors
    }
    activeAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // Ignore cancel errors
    }
  }
}

// Check if Speech Recognition is supported in browser
export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

export interface SpeechRecognitionHandlers {
  onResult: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onStart: () => void;
  onEnd: () => void;
  onAudioLevel?: (level: number) => void;
}

export class VoiceProductRecognizer {
  private recognition: any = null;
  private isListening = false;
  private accumulatedTranscript = '';
  private interimTranscript = '';
  private currentLanguage: SupportedLanguage = 'hi';
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;

  constructor(private handlers: SpeechRecognitionHandlers) {}

  public async start(lang: SupportedLanguage = 'hi') {
    this.currentLanguage = lang;
    this.accumulatedTranscript = '';
    this.interimTranscript = '';

    // 1. Request microphone permission
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.setupAudioMeter(this.mediaStream);
      }
    } catch (micErr: any) {
      console.warn('Microphone access issue:', micErr);
      if (micErr?.name === 'NotAllowedError' || micErr?.name === 'PermissionDeniedError') {
        this.handlers.onError('Microphone permission denied. Please allow microphone access in your browser settings.');
        return;
      }
    }

    // 2. Initialize SpeechRecognition if available
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      this.handlers.onError('Speech Recognition is not natively supported in this browser. You can type or use sample voice transcripts.');
      return;
    }

    try {
      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
      this.recognition.lang = LANGUAGE_SPEECH_MAP[lang] || 'hi-IN';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.handlers.onStart();
      };

      this.recognition.onresult = (event: any) => {
        let currentInterim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.accumulatedTranscript += (this.accumulatedTranscript ? ' ' : '') + transcriptPiece.trim();
          } else {
            currentInterim += transcriptPiece;
          }
        }
        this.interimTranscript = currentInterim;
        const fullDisplay = (this.accumulatedTranscript + (currentInterim ? ' ' + currentInterim : '')).trim();
        this.handlers.onResult(fullDisplay, !currentInterim);
      };

      this.recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        if (event.error === 'no-speech') {
          return;
        }
        if (event.error === 'not-allowed') {
          this.handlers.onError('Microphone permission was denied.');
        } else if (event.error === 'network') {
          this.handlers.onError('Speech recognition network error. Check your connection.');
        } else {
          this.handlers.onError(`Speech error: ${event.error}`);
        }
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          try {
            this.recognition.start();
            return;
          } catch (e) {
            // Already active
          }
        }
        this.cleanupAudio();
        this.handlers.onEnd();
      };

      this.recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      this.handlers.onError(err?.message || 'Could not start voice recognition.');
      this.cleanupAudio();
    }
  }

  private setupAudioMeter(stream: MediaStream) {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      this.audioContext = new AudioCtx();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      source.connect(this.analyser);

      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkLevel = () => {
        if (!this.analyser) return;
        this.analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const normalized = Math.min(100, Math.round((average / 128) * 100));
        if (this.handlers.onAudioLevel) {
          this.handlers.onAudioLevel(normalized);
        }
        if (this.isListening) {
          this.animFrameId = requestAnimationFrame(checkLevel);
        }
      };

      this.animFrameId = requestAnimationFrame(checkLevel);
    } catch (e) {
      console.warn('AudioMeter setup skipped:', e);
    }
  }

  public stop() {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
    this.cleanupAudio();
  }

  private cleanupAudio() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((t) => t.stop());
      this.mediaStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch (e) {
        // ignore
      }
      this.audioContext = null;
    }
  }
}

export function speakProductDetails(
  product: ProductAnalysis,
  lang: SupportedLanguage,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  let speechText = '';

  if (lang === 'hi') {
    speechText = `उत्पाद का नाम: ${product.name}। शिल्प शैली: ${product.craftStyle}। सुझाया गया विक्रय मूल्य: ₹${product.suggestedPriceINR} रुपये। मुख्य सामग्री: ${product.materials.join(', ')}। मुख्य बिक्री बिंदु: ${product.sellingPoints.join('। ')}। विवरण: ${product.description}`;
  } else if (lang === 'te') {
    speechText = `ఉత్పత్తి పేరు: ${product.name}. కళా శైలి: ${product.craftStyle}. సూచించిన అమ్మకపు ధర: ₹${product.suggestedPriceINR} రూపాయలు. ఉపయోగించిన పదార్థాలు: ${product.materials.join(', ')}. అమ్మకాల ముఖ్యాంశాలు: ${product.sellingPoints.join('. ')}. వివరణ: ${product.description}`;
  } else if (lang === 'ta') {
    speechText = `தயாரிப்பு பெயர்: ${product.name}. கைவினை பாணி: ${product.craftStyle}. பரிந்துரைக்கப்பட்ட விலை: ₹${product.suggestedPriceINR} ரூபாய். பொருட்கள்: ${product.materials.join(', ')}. முக்கிய விற்பனை புள்ளிகள்: ${product.sellingPoints.join('. ')}. விளக்கம்: ${product.description}`;
  } else {
    speechText = `Product: ${product.name}. Craft style: ${product.craftStyle}. Suggested selling price: ${product.suggestedPriceINR} Indian Rupees. Materials: ${product.materials.join(', ')}. Key selling points: ${product.sellingPoints.join('. ')}. Description: ${product.description}`;
  }

  return playNaturalSpeech(speechText, lang, onStart, onEnd);
}

export function speakText(
  text: string,
  lang: SupportedLanguage,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  return playNaturalSpeech(text, lang, onStart, onEnd);
}

export function speakListingDetails(
  listing: PublishedListing,
  lang: SupportedLanguage,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  let speechText = '';

  if (lang === 'hi') {
    speechText = `उत्पाद: ${listing.name}। कारीगर: ${listing.artisanName}, ${listing.artisanLocation}। उचित मूल्य: ₹${listing.price} रुपये। शिल्प श्रेणी: ${listing.category}। सामग्री: ${listing.materials.join(', ')}। विवरण: ${listing.description}`;
  } else if (lang === 'te') {
    speechText = `ఉత్పత్తి: ${listing.name}. కళాకారుడు: ${listing.artisanName}, ${listing.artisanLocation}. ధర: ₹${listing.price} రూపాయలు. వర్గం: ${listing.category}. పదార్థాలు: ${listing.materials.join(', ')}. వివరణ: ${listing.description}`;
  } else if (lang === 'ta') {
    speechText = `தயாரிப்பு: ${listing.name}. கைவினைஞர்: ${listing.artisanName}, ${listing.artisanLocation}. விலை: ₹${listing.price} ரூபாய். பொருட்கள்: ${listing.materials.join(', ')}. விவரங்கள்: ${listing.description}`;
  } else {
    speechText = `Product: ${listing.name} by master artisan ${listing.artisanName} from ${listing.artisanLocation}. Fair marketplace price: ${listing.price} Indian Rupees. Category: ${listing.category}. Materials: ${listing.materials.join(', ')}. Description: ${listing.description}`;
  }

  return playNaturalSpeech(speechText, lang, onStart, onEnd);
}


