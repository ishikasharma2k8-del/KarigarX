import React, { useState, useEffect, useRef } from 'react';
import {
  Square,
  Sparkles,
  RefreshCw,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Image as ImageIcon,
  Camera,
  Upload,
  ArrowRight,
  Globe,
  HelpCircle,
  X,
  MessageSquareQuote,
  Pencil,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UI_STRINGS, LANGUAGES } from '../translations';
import { VoiceProductRecognizer, isSpeechRecognitionSupported } from '../utils/speech';
import { VoiceWaveIcon } from './VoiceWaveIcon';

interface VoiceInputCreatorProps {
  currentLang: SupportedLanguage;
  onGenerateListing: (payload: { voiceTranscript: string; imageDataUrl?: string }) => void;
  onSwitchToPhoto: () => void;
}

interface SpokenSamplePrompt {
  id: string;
  lang: SupportedLanguage;
  craftName: string;
  transcript: string;
  suggestedImage: string;
}

const SAMPLE_VOICE_PROMPTS: SpokenSamplePrompt[] = [
  {
    id: 'sample-hi-1',
    lang: 'hi',
    craftName: 'टेराकोटा दीया व कलश',
    transcript:
      'यह पश्चिम बंगाल की शुद्ध लाल मिट्टी से बना पारंपरिक हस्तनिर्मित टेराकोटा दीया और कलश है। इसमें प्राकृतिक रंगों से नक्काशी की गई है। इसे बनाने में दो दिन का समय लगा। यह दिवाली पूजा और घर की सजावट के लिए बहुत बढ़िया है। इसका उचित मूल्य लगभग 650 रुपये होना चाहिए।',
    suggestedImage:
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample-te-1',
    lang: 'te',
    craftName: 'చేనేత కలంకారీ కాటన్ దుపట్టా',
    transcript:
      'ఇది ఆంధ్రప్రదేశ్ మచిలీపట్నం సాంప్రదాయ చేనేత కలంకారీ కాటన్ దుపట్టా. సహజ సిద్ధమైన చెట్ల రంగులు మరియు మూలికలతో చేతితో చెక్క బ్లాక్ ప్రింటింగ్ చేశారు. 100% ప్యూర్ కాటన్ వస్త్రం. దీనిని తయారు చేయడానికి 3 రోజులు పట్టింది. సరసమైన ధర సుమారు 850 రూపాయలు.',
    suggestedImage:
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample-en-1',
    lang: 'en',
    craftName: 'Dhokra Brass Tribal Figurine',
    transcript:
      'This is an authentic handmade Dhokra bell metal tribal musician figurine from Bastar, Chhattisgarh. It is crafted using the ancient 4000-year-old lost-wax casting technique with recycled brass and bell metal. Took about 4 days to finish. Perfect for living room decor and cultural art collectors, suggested price around 1200 rupees.',
    suggestedImage:
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sample-hi-2',
    lang: 'hi',
    craftName: 'चन्नापटनम लकड़ी का खिलौना',
    transcript:
      'यह प्राकृतिक वनस्पति रंगों और सुरक्षित लाख से रंगा हुआ चन्नापटनम का लकड़ी का खिलौना है। यह पर्यावरण के अनुकूल और बच्चों के लिए पूरी तरह सुरक्षित है।',
    suggestedImage:
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
  },
];

export const VoiceInputCreator: React.FC<VoiceInputCreatorProps> = ({
  currentLang,
  onGenerateListing,
  onSwitchToPhoto,
}) => {
  const t = UI_STRINGS[currentLang];
  const [selectedSpeechLang, setSelectedSpeechLang] = useState<SupportedLanguage>(currentLang);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [transcript, setTranscript] = useState<string>('');
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isEditingTranscript, setIsEditingTranscript] = useState<boolean>(false);

  const recognizerRef = useRef<VoiceProductRecognizer | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync selectedSpeechLang if parent language changes
  useEffect(() => {
    setSelectedSpeechLang(currentLang);
  }, [currentLang]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const startVoiceRecording = async () => {
    setVoiceError(null);
    setTranscript('');
    setRecordingSeconds(0);

    const recognizer = new VoiceProductRecognizer({
      onStart: () => {
        setIsRecording(true);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = setInterval(() => {
          setRecordingSeconds((prev) => prev + 1);
        }, 1000);
      },
      onResult: (text: string) => {
        setTranscript(text);
      },
      onError: (err: string) => {
        console.warn('Voice recognition error:', err);
        setVoiceError(err);
        stopVoiceRecording();
      },
      onEnd: () => {
        setIsRecording(false);
        setAudioLevel(0);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
      },
      onAudioLevel: (level: number) => {
        setAudioLevel(level);
      },
    });

    recognizerRef.current = recognizer;
    await recognizer.start(selectedSpeechLang);
  };

  const stopVoiceRecording = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stop();
    }
    setIsRecording(false);
    setAudioLevel(0);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleApplySample = (sample: SpokenSamplePrompt) => {
    setTranscript(sample.transcript);
    setSelectedSpeechLang(sample.lang);
    setAttachedImage(sample.suggestedImage);
    setVoiceError(null);
  };

  const handleAttachImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setAttachedImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleGenerate = () => {
    if (!transcript.trim()) {
      setVoiceError('Please speak or type a short description of your craft first.');
      return;
    }

    onGenerateListing({
      voiceTranscript: transcript.trim(),
      imageDataUrl: attachedImage || undefined,
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D6] shadow-xs text-center space-y-6 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-orange-50 rounded-full blur-3xl pointer-events-none" />

        {/* Header Content */}
        <div className="max-w-xl mx-auto space-y-2 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#b84c28] border border-amber-200 text-xs font-bold shadow-xs">
            <VoiceWaveIcon size="sm" isRecording={isRecording} className="text-[#b84c28]" />
            <span>KarigarX Voice-to-Listing</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B231D]">
            {t.voiceRecordingTitle}
          </h2>

          <p className="text-xs sm:text-sm text-[#7A6E63] leading-relaxed">
            {t.voiceRecordingSubtitle}
          </p>
        </div>

        {/* Language Selection Chips for Voice */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-xs font-bold text-[#7A6E63] flex items-center gap-1 mr-1">
            <Globe className="w-3.5 h-3.5 text-[#b84c28]" />
            <span>Voice Language:</span>
          </span>
          {LANGUAGES.map((lang) => {
            const isSelected = selectedSpeechLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                disabled={isRecording}
                onClick={() => setSelectedSpeechLang(lang.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#b84c28] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#2B231D] hover:bg-[#F2ECE1] border border-[#E8E2D6]'
                } ${isRecording ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
              >
                <span>{lang.flag}</span>
                <span>{lang.nativeName}</span>
                {isSelected && <CheckCircle2 className="w-3 h-3" />}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Voice Button Center */}
        <div className="py-4 space-y-4">
          {!isRecording ? (
            <div className="space-y-4">
              <button
                type="button"
                id="start-voice-recording-btn"
                onClick={startVoiceRecording}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#b84c28] to-[#d9663d] hover:from-[#a23f1e] hover:to-[#c4532b] text-white flex flex-col items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 border-4 border-amber-100 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <VoiceWaveIcon size="lg" className="text-white" />
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase mt-1 text-amber-100">
                  Speak
                </span>
              </button>

              <div className="space-y-1">
                <p className="text-base font-bold text-[#2B231D]">
                  {t.speakToCreateListing}
                </p>
                <p className="text-xs text-[#7A6E63]">
                  Tap to speak in English, Hindi, Telugu, or Tamil
                </p>
              </div>
            </div>
          ) : (
            /* Active Live Recording State */
            <div className="bg-amber-50/70 border-2 border-[#b84c28] rounded-3xl p-6 sm:p-8 space-y-5 animate-pulse-subtle">
              {/* Top Recording Bar with Timer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
                  <span className="w-3 h-3 rounded-full bg-rose-600 absolute" />
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider pl-4">
                    {t.listeningStatus}
                  </span>
                </div>
                <div className="px-3 py-1 bg-white rounded-full border border-rose-200 text-rose-800 font-mono font-bold text-sm shadow-xs">
                  {formatTimer(recordingSeconds)}
                </div>
              </div>

              {/* Animated Live Audio Wave Visualizer */}
              <div className="flex items-center justify-center gap-1.5 h-12 py-2">
                {[12, 28, 45, 75, 95, 60, 80, 40, 90, 70, 35, 20].map((baseHeight, idx) => {
                  const dynamicHeight = Math.max(15, Math.min(100, (baseHeight * (audioLevel + 30)) / 60));
                  return (
                    <span
                      key={idx}
                      className="w-1.5 rounded-full bg-gradient-to-t from-[#b84c28] to-amber-500 transition-all duration-75"
                      style={{ height: `${dynamicHeight}%` }}
                    />
                  );
                })}
              </div>

              {/* Live Live Transcript Preview */}
              <div className="bg-white rounded-2xl p-4 border border-amber-200 text-left min-h-[70px] shadow-xs">
                <p className="text-xs text-[#7A6E63] font-bold mb-1 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-[#b84c28]" />
                  <span>Live Transcribed Speech:</span>
                </p>
                <p className="text-sm font-medium text-[#2B231D] italic">
                  {transcript || 'Listening to your craft details... speak freely...'}
                </p>
              </div>

              {/* Stop Recording Button */}
              <button
                type="button"
                id="stop-voice-recording-btn"
                onClick={stopVoiceRecording}
                className="py-3 px-8 bg-[#2B231D] hover:bg-black text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm mx-auto transition active:scale-95"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>{t.stopRecording}</span>
              </button>
            </div>
          )}
        </div>

        {/* Display Transcribed Text for Review & Edit */}
        {transcript && !isRecording && (
          <div className="bg-[#FAF7F2] rounded-3xl p-5 sm:p-6 border border-[#E8E2D6] text-left space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8E2D6] pb-3">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-[#b84c28]" />
                <h3 className="text-sm font-bold text-[#2B231D]">
                  {t.reviewSpokenText}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#7A6E63]">
                  {transcript.split(/\s+/).filter(Boolean).length} words
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingTranscript(!isEditingTranscript)}
                  className="text-xs font-bold text-[#b84c28] hover:text-[#a23f1e] flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-[#E8E2D6]"
                >
                  <Pencil className="w-3 h-3" />
                  <span>{isEditingTranscript ? 'Done Editing' : 'Edit Text'}</span>
                </button>
              </div>
            </div>

            {/* Editable or review textarea */}
            <textarea
              rows={3}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder={t.editSpokenTextPlaceholder}
              className="w-full bg-white rounded-2xl border border-[#D9CFBF] p-3 text-sm text-[#2B231D] focus:outline-none focus:ring-2 focus:ring-[#b84c28] resize-y leading-relaxed"
            />

            {/* Optional Attached Craft Photo */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 border-t border-[#E8E2D6]">
              <div className="flex items-center gap-3">
                {attachedImage ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={attachedImage}
                      alt="Attached craft photo"
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-[#b84c28]"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-[#2B231D]">Photo attached</p>
                      <button
                        type="button"
                        onClick={() => setAttachedImage(null)}
                        className="text-rose-600 text-[11px] hover:underline flex items-center gap-0.5"
                      >
                        <X className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A6E63] hover:text-[#2B231D] bg-white px-3 py-1.5 rounded-xl border border-[#E8E2D6] hover:bg-stone-50 transition"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#b84c28]" />
                      <span>Attach Craft Photo (Optional)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={startVoiceRecording}
                  className="py-2.5 px-4 bg-white hover:bg-stone-50 text-[#7A6E63] font-bold rounded-xl border border-[#E8E2D6] flex items-center justify-center gap-1.5 text-xs transition active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.reRecord}</span>
                </button>

                <button
                  type="button"
                  id="generate-listing-from-voice-btn"
                  onClick={handleGenerate}
                  className="flex-1 sm:flex-none py-2.5 px-6 bg-[#b84c28] hover:bg-[#a23f1e] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-xs transition active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.generateFromVoice}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden image input for optional photo attachment */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAttachImageFile}
        />

        {/* Error Alert */}
        {voiceError && (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-2.5 text-amber-900 text-xs text-left">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{voiceError}</p>
              <p className="text-[11px] text-amber-800 mt-1">
                Tip: You can also tap any sample craft prompt below to test voice listing generation instantly.
              </p>
            </div>
          </div>
        )}

        {/* Switch to Photo Scanner Option */}
        <div className="pt-2 border-t border-[#E8E2D6]">
          <button
            type="button"
            onClick={onSwitchToPhoto}
            className="text-xs font-bold text-[#b84c28] hover:text-[#a23f1e] hover:underline inline-flex items-center gap-1.5 transition"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{t.usePhotoInstead}</span>
          </button>
        </div>
      </div>

      {/* Helpful Spoken Craft Prompt Samples */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E2D6] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#b84c28]" />
            <h3 className="text-sm font-bold text-[#2B231D]">
              {t.voiceSamplesTitle}
            </h3>
          </div>
          <span className="text-[11px] bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full font-bold border border-amber-200">
            One-Tap Quick Try
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SAMPLE_VOICE_PROMPTS.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleApplySample(sample)}
              className="p-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#E8E2D6] hover:border-[#b84c28] text-left transition flex items-start gap-3 group active:scale-98"
            >
              <img
                src={sample.suggestedImage}
                alt={sample.craftName}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#E8E2D6]"
              />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2B231D] group-hover:text-[#b84c28] transition truncate">
                    {sample.craftName}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#7A6E63] bg-white px-1.5 py-0.5 rounded border border-[#E8E2D6]">
                    {sample.lang}
                  </span>
                </div>
                <p className="text-[11px] text-[#7A6E63] line-clamp-2 italic leading-relaxed">
                  "{sample.transcript}"
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Voice Tips Card for Artisans */}
      <div className="bg-amber-50/50 rounded-3xl p-5 border border-amber-200/80 text-left space-y-2">
        <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[#b84c28]" />
          <span>{t.voiceHelpTips}</span>
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-900 font-medium">
          <li className="flex items-start gap-1.5">
            <span className="text-[#b84c28] font-bold">•</span>
            <span>{t.voiceTip1}</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#b84c28] font-bold">•</span>
            <span>{t.voiceTip2}</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#b84c28] font-bold">•</span>
            <span>{t.voiceTip3}</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-[#b84c28] font-bold">•</span>
            <span>{t.voiceTip4}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
