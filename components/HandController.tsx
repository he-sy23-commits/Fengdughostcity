import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker, DrawingUtils } from '@mediapipe/tasks-vision';
import { Camera, Hand, Loader2, MousePointer2, Expand, RefreshCw } from 'lucide-react';

interface HandControllerProps {
  onDisperse: (isDispersed: boolean) => void;
  onRotate: (rotation: number | null) => void;
}

const HandController: React.FC<HandControllerProps> = ({ onDisperse, onRotate }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [status, setStatus] = useState<string>('Initializing...');
  const [gesture, setGesture] = useState<'NONE' | 'OPEN' | 'FIST' | 'POINTING'>('NONE');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let handLandmarker: HandLandmarker | null = null;
    let animationFrameId: number;
    let lastVideoTime = -1;
    let stream: MediaStream | null = null;

    const setupMediaPipe = async () => {
      try {
        setStatus('Loading AI Model...');
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm"
        );
        
        handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });

        setStatus('Accessing Camera...');
        // Start Webcam
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          } 
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Explicitly play (needed for some browsers)
          await videoRef.current.play();
          
          setIsLoaded(true);
          setStatus('Ready');
          predict();
        }
      } catch (error) {
        console.error("Error initializing Hand Controller:", error);
        setStatus('Camera Error');
        setHasError(true);
      }
    };

    const predict = () => {
      if (videoRef.current && handLandmarker && canvasRef.current) {
        let startTimeMs = performance.now();
        if (videoRef.current.currentTime !== lastVideoTime) {
          lastVideoTime = videoRef.current.currentTime;
          const detections = handLandmarker.detectForVideo(videoRef.current, startTimeMs);
          
          processResults(detections);
          drawResults(detections);
        }
        animationFrameId = requestAnimationFrame(predict);
      }
    };

    const processResults = (result: any) => {
      if (result.landmarks && result.landmarks.length > 0) {
        const landmarks = result.landmarks[0];
        const wrist = landmarks[0];
        
        // Helper to check if finger is extended
        // Calculates ratio of distance: Wrist->Tip vs Wrist->PIP
        const isExtended = (tipIdx: number, pipIdx: number) => {
           const dTip = Math.hypot(landmarks[tipIdx].x - wrist.x, landmarks[tipIdx].y - wrist.y);
           const dPip = Math.hypot(landmarks[pipIdx].x - wrist.x, landmarks[pipIdx].y - wrist.y);
           return dTip > dPip * 1.1; 
        };

        const thumbOpen = isExtended(4, 2);
        const indexOpen = isExtended(8, 6);
        const middleOpen = isExtended(12, 10);
        const ringOpen = isExtended(16, 14);
        const pinkyOpen = isExtended(20, 18);

        const extendedCount = [thumbOpen, indexOpen, middleOpen, ringOpen, pinkyOpen].filter(Boolean).length;

        // Gesture Logic
        if (extendedCount >= 4) {
          setGesture('OPEN');
          onDisperse(true);
          onRotate(null);
        } else if (extendedCount === 0 || (extendedCount === 1 && thumbOpen)) {
          // Fist
          setGesture('FIST');
          onDisperse(false);
          onRotate(null);
        } else if (indexOpen && !middleOpen && !ringOpen && !pinkyOpen) {
          setGesture('POINTING');
          onDisperse(false);
          // Map X coordinate (0 to 1) to Rotation (-PI to PI range approx)
          // Increased sensitivity factor to 8 for fuller rotation
          const x = 1.0 - landmarks[8].x; 
          onRotate((x - 0.5) * 8); 
        } else {
          setGesture('NONE');
        }
      } else {
        setGesture('NONE');
        onRotate(null);
      }
    };

    const drawResults = (result: any) => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (result.landmarks) {
        for (const landmarks of result.landmarks) {
          const drawingUtils = new DrawingUtils(ctx);
          drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, {
            color: "rgba(255, 255, 255, 0.5)",
            lineWidth: 2
          });
          drawingUtils.drawLandmarks(landmarks, {
            color: "#A8A29E", 
            lineWidth: 1,
            radius: 3
          });
        }
      }
      ctx.restore();
    };

    setupMediaPipe();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (handLandmarker) handLandmarker.close();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (hasError) {
    return (
        <div className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-red-900/50 backdrop-blur-md rounded-lg border border-red-500/30 text-red-200 text-xs font-serif-en">
            Camera Error. Check Permissions.
        </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse items-end gap-2 group">
      {/* Camera Preview */}
      <div className={`relative w-32 h-24 bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 shadow-lg transition-opacity duration-500 ${isLoaded ? 'opacity-40 group-hover:opacity-100' : 'opacity-100'}`}>
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center text-white/50">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-[10px] uppercase tracking-widest">{status}</span>
          </div>
        )}
        <video 
          ref={videoRef} 
          className="absolute inset-0 w-full h-full object-cover -scale-x-100 opacity-60"
          playsInline
          muted
        />
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover -scale-x-100"
        />
      </div>
      
      {/* Status Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 transition-all duration-300">
         {gesture === 'OPEN' && <Expand className="w-3 h-3 text-cyan-400" />}
         {gesture === 'FIST' && <Hand className="w-3 h-3 text-emerald-400" />}
         {gesture === 'POINTING' && <MousePointer2 className="w-3 h-3 text-amber-400" />}
         {gesture === 'NONE' && <RefreshCw className="w-3 h-3 text-stone-500" />}
         
         <span className="text-xs font-serif-en tracking-wider text-stone-200 uppercase">
            {gesture === 'OPEN' && "DISPERSE"}
            {gesture === 'FIST' && "GATHER"}
            {gesture === 'POINTING' && "ROTATE"}
            {gesture === 'NONE' && (isLoaded ? "Scanning..." : "Init...")}
         </span>
      </div>
    </div>
  );
};

export default HandController;