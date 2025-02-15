import { useState } from "react";
import NierLoadingScreen from "../components/Loading";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <NierLoadingScreen setIsLoading={setIsLoading} />;
  }

  return (
    <div className="space-y-8">
      {/* 메인 타이틀 섹션 */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl mb-6 pt-7">YoRHa DB - [9]</h1>
        <p className="text-lg tracking-wider">-- Welcome to YoRHa Network --</p>
        <div className="h-[1px] w-32 bg-[#454138] mx-auto"></div>
      </section>

      {/* 메인 네비게이션 */}
      <nav className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mt-12">
        <button
          className="button p-8 text-left hover:bg-[#454138] hover:text-[#dcd8c0] transition-all"
          onClick={() => nav("/login")}
        >
          <p className="text-sm tracking-widest mb-2">01</p>
          <p className="text-xl mb-4">AUTHORIZATION</p>
          <p className="text-sm opacity-70">Access YoRHa database</p>
        </button>

        <button
          className="button p-8 text-left hover:bg-[#454138] hover:text-[#dcd8c0] transition-all"
          onClick={() => nav("/register")}
        >
          <p className="text-sm tracking-widest mb-2">02</p>
          <p className="text-xl mb-4">NEW USER</p>
          <p className="text-sm opacity-70">Register new YoRHa unit</p>
        </button>

        <button className="button p-8 text-left hover:bg-[#454138] hover:text-[#dcd8c0] transition-all">
          <p className="text-sm tracking-widest mb-2">03</p>
          <p className="text-xl mb-4">ARCHIVES</p>
          <p className="text-sm opacity-70">Access data archives</p>
        </button>

        <button className="button p-8 text-left hover:bg-[#454138] hover:text-[#dcd8c0] transition-all">
          <p className="text-sm tracking-widest mb-2">04</p>
          <p className="text-xl mb-4">SYSTEM INFO</p>
          <p className="text-sm opacity-70">View system status</p>
        </button>
      </nav>

      {/* 하단 상태 표시 */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 text-sm">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <p className="text-sm tracking-wider">SYSTEM STATUS: ONLINE</p>
          <div className="tracking-wider">
            {new Date().toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
