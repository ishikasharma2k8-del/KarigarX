import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  RefreshCw,
  X,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Video,
  ArrowRight,
} from 'lucide-react';
import { UI_STRINGS } from '../translations';
import { SupportedLanguage } from '../types';
import { SAMPLE_CRAFTS, SampleCraft } from '../data/samples';
import { VoiceInputCreator } from './VoiceInputCreator';
import { VoiceWaveIcon } from './VoiceWaveIcon';

interface CameraScannerProps {
  currentLang: SupportedLanguage;
  onImageSelected: (imageDataUrl: string) => void;
  onVoiceListingRequested?: (payload: { voiceTranscript: string; imageDataUrl?: string }) => void;
  initialMode?: 'photo' | 'voice';
}

export const CameraScanner: React.FC<CameraScannerProps> = ({
  currentLang,
  onImageSelected,
  onVoiceListingRequested,
  initialMode = 'photo',
}) => {
  const t = UI_STRINGS[currentLang];
  const [creationMode, setCreationMode] = useState<'photo' | 'voice'>(initialMode);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isStartingCamera, setIsStartingCamera] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraCaptureInputRef = useRef<HTMLInputElement | null>(null);

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch((e) => {
        console.warn('Video element play failure:', e);
      });
    }
  }, [isCameraActive]);

  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    setCameraError(null);
    setIsStartingCamera(true);
    stopCameraStream();

    let stream: MediaStream | null = null;

    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        const legacyGetUserMedia =
          (navigator as any).webkitGetUserMedia ||
          (navigator as any).mozGetUserMedia ||
          (navigator as any).getUserMedia;

        if (!legacyGetUserMedia) {
          throw new Error('Live camera is not directly available. Use Take Photo or Upload Image.');
        }

        stream = await new Promise<MediaStream>((resolve, reject) => {
          legacyGetUserMedia.call(navigator, { video: true, audio: false }, resolve, reject);
        });
      } else {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: { ideal: mode },
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          });
        } catch (firstErr) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
        }
      }

      streamRef.current = stream;
      setFacingMode(mode);
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch((playErr) => {
          console.warn('Play video caught:', playErr);
        });
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      let errorMsg = 'Could not start live camera feed.';
      if (err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError') {
        errorMsg = 'Camera permission was denied. Tap "Take Photo" or choose from your gallery.';
      }
      setCameraError(errorMsg);
      setIsCameraActive(false);
    } finally {
      setIsStartingCamera(false);
    }
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

    stopCameraStream();
    onImageSelected(dataUrl);
  };

  const toggleCameraFacing = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    startCamera(nextMode);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onImageSelected(dataUrl);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          onImageSelected(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      {/* Top Creation Mode Selector */}
      <div className="flex items-center justify-center">
        <div className="bg-white p-1.5 rounded-2xl border border-[#E8E2D6] shadow-xs flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setCreationMode('photo');
              stopCameraStream();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              creationMode === 'photo'
                ? 'bg-[#b84c28] text-white shadow-xs'
                : 'text-[#7A6E63] hover:text-[#2B231D] hover:bg-stone-50'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Photo Scanner</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCreationMode('voice');
              stopCameraStream();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              creationMode === 'voice'
                ? 'bg-[#b84c28] text-white shadow-xs'
                : 'text-[#7A6E63] hover:text-[#2B231D] hover:bg-stone-50'
            }`}
          >
            <div className={`w-4 h-4 flex items-center justify-center ${creationMode === 'voice' ? 'text-white' : 'text-[#7A6E63]'}`}>
              <VoiceWaveIcon size="sm" />
            </div>
            <span>Speak to Create</span>
          </button>
        </div>
      </div>

      {/* Voice Mode View */}
      {creationMode === 'voice' ? (
        <VoiceInputCreator
          currentLang={currentLang}
          onGenerateListing={(payload) => {
            if (onVoiceListingRequested) {
              onVoiceListingRequested(payload);
            }
          }}
          onSwitchToPhoto={() => setCreationMode('photo')}
        />
      ) : isCameraActive ? (
        /* Live Viewfinder Modal */
        <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] max-w-2xl mx-auto flex flex-col border border-stone-800">
          {/* Top Controls */}
          <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
            <span className="bg-black/70 backdrop-blur text-white text-xs px-3 py-1 rounded-full border border-white/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live KarigarX AI Viewfinder
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleCameraFacing}
                className="w-9 h-9 rounded-full bg-black/70 backdrop-blur text-white border border-white/20 flex items-center justify-center hover:bg-stone-800 transition"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={stopCameraStream}
                className="w-9 h-9 rounded-full bg-black/70 backdrop-blur text-white border border-white/20 flex items-center justify-center hover:bg-stone-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Video element */}
          <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Viewfinder Target Guidelines */}
            <div className="absolute inset-10 border-2 border-dashed border-amber-400/80 rounded-2xl pointer-events-none flex items-center justify-center">
              <span className="text-center text-amber-200 text-xs bg-black/75 px-3 py-1 rounded-full font-bold">
                Position your handicraft here
              </span>
            </div>
          </div>

          {/* Shutter bar */}
          <div className="p-4 bg-stone-900 flex items-center justify-center">
            <button
              type="button"
              onClick={captureFrame}
              className="w-16 h-16 rounded-full bg-[#b84c28] hover:bg-[#a23f1e] text-white flex items-center justify-center shadow-lg transition active:scale-95 border-4 border-white"
            >
              <Camera className="w-7 h-7" />
            </button>
          </div>
        </div>
      ) : (
        /* Standard Clean Photo Scanner Studio */
        <div className="space-y-6">
          {/* Main Dropzone / Capture Hero */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`bg-white rounded-3xl p-8 sm:p-12 border-2 border-dashed text-center shadow-xs transition-all ${
              isDragging
                ? 'border-[#b84c28] bg-amber-50/50 scale-[1.01]'
                : 'border-[#D9CFBF] hover:border-[#b84c28]'
            }`}
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-[#FAF7F2] text-[#b84c28] border border-[#E8E2D6] flex items-center justify-center mx-auto shadow-xs">
                <Camera className="w-10 h-10 stroke-[1.7]" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B231D]">
                  Capture or Upload Craft Photo
                </h2>
                <p className="text-xs sm:text-sm text-[#7A6E63] leading-relaxed">
                  Drag and drop your artisan product photo here, or use the camera to automatically identify materials, craft style, and compute fair Indian prices.
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => cameraCaptureInputRef.current?.click()}
                  className="w-full sm:w-auto py-3.5 px-6 bg-[#b84c28] hover:bg-[#a23f1e] text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm transition active:scale-95"
                >
                  <Camera className="w-4 h-4" />
                  <span>Take Photo with Camera</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto py-3.5 px-6 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#2B231D] font-bold rounded-2xl border border-[#E8E2D6] flex items-center justify-center gap-2 text-sm transition active:scale-95"
                >
                  <Upload className="w-4 h-4 text-[#b84c28]" />
                  <span>Upload from Gallery</span>
                </button>

                <button
                  type="button"
                  disabled={isStartingCamera}
                  onClick={() => startCamera('environment')}
                  className="w-full sm:w-auto py-3.5 px-4 bg-white hover:bg-stone-50 text-[#7A6E63] font-bold rounded-2xl border border-[#E8E2D6] flex items-center justify-center gap-2 text-xs transition active:scale-95"
                >
                  <Video className="w-4 h-4 text-stone-600" />
                  <span>Live Web Viewfinder</span>
                </button>
              </div>

              {/* "Use Voice Instead" Option Near Photo Upload Options */}
              <div className="pt-3 border-t border-[#E8E2D6] flex items-center justify-center">
                <button
                  type="button"
                  id="use-voice-instead-btn"
                  onClick={() => setCreationMode('voice')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-[#b84c28] border border-amber-200 text-xs font-bold transition active:scale-95"
                >
                  <div className="w-5 h-5 rounded-full bg-[#b84c28] text-white flex items-center justify-center shadow-xs">
                    <VoiceWaveIcon size="sm" />
                  </div>
                  <span>{t.useVoiceInstead}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Visual Photo Comparison Guidelines (DOs & DONTs for Low Literacy) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E2D6] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#2B231D] flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#b84c28]" />
                <span>{t.photoGuideTitle}</span>
              </h3>
              <span className="text-[11px] text-[#7A6E63]">Clear photos get higher prices</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Bad: Dark */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-stone-900 text-stone-600 flex items-center justify-center text-xl shrink-0">
                  🏺
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-800 block">❌ {t.photoDark}</span>
                  <span className="text-[11px] text-rose-700 block">No low light/shadows</span>
                </div>
              </div>

              {/* Bad: Blurry */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-stone-200 text-stone-400 flex items-center justify-center text-xl shrink-0 blur-[2px]">
                  🏺
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-800 block">❌ {t.photoBlurry}</span>
                  <span className="text-[11px] text-rose-700 block">Hold camera steady</span>
                </div>
              </div>

              {/* Good: Clear & Sharp */}
              <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-3 flex items-center gap-3 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center text-2xl shrink-0 border border-emerald-400">
                  🏺
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-800 block">✅ {t.photoClear}</span>
                  <span className="text-[11px] text-emerald-700 block">Daylight & sharp focus</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hidden inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <input
            ref={cameraCaptureInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Error Message */}
          {cameraError && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-center gap-3 text-amber-900 text-xs">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
              <p className="font-semibold">{cameraError}</p>
            </div>
          )}

          {/* Sample Crafts Quick Try */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-[#2B231D] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#b84c28]" />
                <span>Or select a sample craft to test:</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {SAMPLE_CRAFTS.map((sample: SampleCraft) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => onImageSelected(sample.image)}
                  className="bg-white rounded-2xl border border-[#E8E2D6] p-2 hover:border-[#b84c28] hover:shadow-md transition text-left active:scale-95 flex flex-col justify-between"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-stone-100 relative">
                    <img
                      src={sample.image}
                      alt={sample.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2B231D] line-clamp-1">{sample.name}</h4>
                    <span className="text-[10px] text-[#7A6E63] block line-clamp-1">{sample.region}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

