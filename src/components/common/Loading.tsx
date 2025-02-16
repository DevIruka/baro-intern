import { useState } from "react";
import { useEffect } from "react";
import { systemMessages } from "../../constant/systemMessages";


// NierLoadingScreen.jsx
interface NierLoadingScreenProps {
  setIsLoading: (isLoading: boolean) => void;
}

const NierLoadingScreen = ({ setIsLoading }: NierLoadingScreenProps) => {
  const randomIndex = Math.floor(Math.random() * systemMessages.length);
  const [message, setMessage] = useState(systemMessages[randomIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * systemMessages.length);
      setMessage(systemMessages[randomIndex]);
    }, 2000);
    setTimeout(() => setIsLoading(false), 1500);
    return () => clearInterval(interval);
  }, [setIsLoading]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
      {/* 스캔라인 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-[2px] bg-white/10 [animation:scanline_2s_linear_infinite]" />
      </div>

      {/* 메인 로딩 바 */}
      <div className="relative w-[300px]">
        <div className="border-2 border-white/80 h-8 w-full relative overflow-hidden bg-black/80">
          <div className="[animation:loading_2s_infinite] absolute h-full bg-white/90 w-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-mono tracking-[0.2em] animate-pulse">
              LOADING...
            </span>
          </div>
        </div>
      </div>

      {/* 시스템 메시지 */}
      <div className="mt-4 text-white/70 font-mono text-sm tracking-wider">
        {message}
      </div>

      <style>
        {`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes scanline {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        `}
      </style>
    </div>
  );
};

export default NierLoadingScreen;
