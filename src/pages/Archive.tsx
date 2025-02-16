import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
// 타이핑 효과를 위한 커스텀 훅
const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return displayText;
};

const Archive = () => {
  const { user } = useAuthStore();
  const nav = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const typedWarning = useTypewriter(
    "Access denied: Insufficient security clearance."
  );
  const typedGlory = useTypewriter("For the Glory of Mankind", 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWarning(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const onClickHandler = () => {
    setShowWarning(false);
    nav("/");
  };

  return (
    <div className="min-h-screen p-8 text-gray-800 relative">
      {/* 메인 컨테이너 */}
      <div className="max-w-3xl mx-auto p-8 border relative">
        {/* 제목 섹션 */}
        <div className="mb-8 border-b-2 border-gray-800 pb-4">
          <h1 className="text-3xl font-light tracking-widest">
            System Archives
          </h1>
          <div className="text-sm text-gray-600 font-mono">
            ID: YoRHa-{user?.nickname}
          </div>
        </div>

        {/* 문서 섹션 */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl text-gray-600">[</span>
            <h2 className="text-xl font-light tracking-wide">
              Project Gestalt Report
            </h2>
            <span className="text-2xl text-gray-600">]</span>
          </div>

          <div className="pl-4 py-4 border-l-3 border-gray-800 space-y-4">
            <p className="leading-relaxed">
              March 12, 2014 <br></br> <br></br> [Summary] <br></br> <br></br>{" "}
              The proliferation of the White Chlorination Syndrome that emerged
              in 2003—alongside the appearance of the "Giant" and "Dragon"—has
              continued unabated, and outbreaks are now being observed on a
              global scale. Despite being researched in laboratories across the
              world, not only have there been no breakthroughs in the
              development of a vaccine to prevent infection, we have yet to
              ascertain how it even spreads. However, many technological
              breakthroughs have been made as a result of research conducted on
              the "maso" particle that was discovered at that same time. We are
              confident that the technology it enables—the separation of the
              soul from the body and the independent preservation of both—will
              be the final defense against the unprecedented threat to humanity
              we now face. Now that the project has passed from preparation into
              the main implementation phase, we have given it the official name
              "Project Gestalt".
            </p>
            <p className="font-mono text-sm text-gray-600">
              Data classification: Top Secret
            </p>
            <p className="font-mono text-sm text-gray-600">
              Access Level Required: 9S
            </p>
          </div>
        </div>
      </div>

      {/* 장식용 모서리 */}
      <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-gray-800"></div>
      <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-gray-800"></div>
      <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-gray-800"></div>
      <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-gray-800"></div>

      {/* 경고 모달 */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative max-w-md w-full mx-4">
            {/* 모달 테두리 장식 */}
            <div className="absolute inset-0 border border-red-500 opacity-50"></div>
            <div className="absolute inset-0 border border-red-500 opacity-50 animate-pulse"></div>

            {/* 모달 내용 */}
            <div className="bg-black p-8 text-red-500 border border-red-500 relative overflow-hidden">
              {/* 글리치 효과용 가상 요소 */}
              <div className="glitch-effect absolute inset-0 bg-red-500/10 animate-glitch"></div>

              <div className="mb-6 flex items-center space-x-2">
                <span className="text-2xl">[</span>
                <h2 className="text-xl font-light tracking-widest uppercase glitch-text">
                  System Alert
                </h2>
                <span className="text-2xl">]</span>
              </div>

              <div className="space-y-4 font-mono relative z-10">
                <p className="animate-pulse">! WARNING !</p>
                <p className="text-white/90 glitch-text">ACCESS DENIED</p>
                <p className="text-sm opacity-80">{typedWarning}</p>
                <p className="text-xs opacity-80 italic mt-4 glitch-text">
                  {typedGlory}
                </p>
                <div className="text-xs opacity-60 mt-4">
                  Error Code: E0X-0011
                  <br />
                  Security Level: Maximum
                </div>
              </div>

              <button
                onClick={onClickHandler}
                className="mt-6 px-4 py-2 border border-red-500 hover:bg-red-500/20 
                         transition-colors duration-300 text-sm tracking-wider"
              >
                [ACKNOWLEDGE]
              </button>
            </div>

            {/* 모서리 장식 */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-red-500"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-red-500"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-red-500"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-red-500"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Archive;
