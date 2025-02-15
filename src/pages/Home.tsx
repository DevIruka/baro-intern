import { useEffect, useState } from "react";
import NierLoadingScreen from "../components/Loading";
import { useAuthStore } from "../store/authStore";
import { supabase } from "../api/supabaseClient";
import NavButton from "../components/Home/NavButton";

const Home = () => {
  const { setUser, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(() => {
    return localStorage.getItem("hasSeenLoading") !== "true";
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser({
        id: session?.user?.id || "",
        email: session?.user?.email || null,
        nickname: session?.user?.user_metadata.nickname || null,
        created_at: session?.user?.created_at || "",
        img_url: session?.user?.user_metadata.img_url || null,
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser({
        id: session?.user?.id || "",
        email: session?.user?.email || null,
        nickname: session?.user?.user_metadata.nickname || null,
        created_at: session?.user?.created_at || "",
        img_url: session?.user?.user_metadata.img_url || null,
      });
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  if (isLoading) {
    return (
      <NierLoadingScreen
        setIsLoading={(value) => {
          setIsLoading(value);
          if (!value) {
            localStorage.setItem("hasSeenLoading", "true");
          }
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* 메인 타이틀 섹션 */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl mb-6 pt-7">YoRHa DB - [9]</h1>
        <p className="text-lg tracking-wider">
          {user?.nickname
            ? `-- Welcome back, ${user.nickname} --`
            : "-- Welcome to YoRHa Network --"}
        </p>
        <div className="h-[1px] w-32 bg-[#454138] mx-auto"></div>
      </section>

      {/* 메인 네비게이션 */}
      <nav className="grid grid-cols-1 gap-4 max-w-2xl mx-auto mt-12">
        {!user?.id ? (
          <>
            <NavButton
              number="01"
              title="AUTHORIZATION"
              description="Access YoRHa database"
              to="/login"
            />
            <NavButton
              number="02"
              title="NEW UNIT"
              description="Register new YoRHa unit"
              to="/register"
            />
          </>
        ) :  (
          <NavButton
            number="01"
            title="UNIT INFO"
            description="View unit system status"
            to="/unitinfo"
          />
        )}
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
