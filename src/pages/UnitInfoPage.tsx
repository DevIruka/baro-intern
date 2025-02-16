import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { supabase } from "../api/supabaseClient";
import defaultProfileImage from "/yorha.png";
import { useNavigate } from "react-router-dom";
import { useUnitHandler } from "../hooks/useUnitHandler";

const UnitInfoPage = () => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();

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
  }, [setUser]);

  const {
    isEditingNickname,
    setIsEditingNickname,
    newNumberPart,
    setNewNumberPart,
    newLetterPart,
    setNewLetterPart,
    isUploading,
    handleNicknameUpdate,
    handleNumberPartChange,
    handleLetterPartChange,
    handleImageUpload,
  } = useUnitHandler({ user, setUser });

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto space-y-8">
      <section className="text-center space-y-4 mb-12">
        <h1 className="text-4xl">UNIT INFORMATION</h1>
        <div className="h-[1px] w-32 bg-[#454138] mx-auto"></div>
      </section>

      <div className="border-2 border-[#c3bdb4] bg-[#4b4a45] p-8 relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c3bdb4] to-transparent" />

        {/* 프로필 이미지 섹션 */}
        <div className="flex justify-center mb-8">
          <div
            className="relative w-32 h-32 border-2 border-[#c3bdb4] cursor-pointer group overflow-hidden"
            onClick={() =>
              document.getElementById("profile-image-input")?.click()
            }
          >
            <img
              src={user?.img_url || defaultProfileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-sm text-[#c3bdb4]">
                {isUploading
                  ? "UPLOADING"
                  : user?.img_url
                  ? "EDIT IMAGE"
                  : "ADD IMAGE"}
              </span>
            </div>
            <input
              id="profile-image-input"
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {/* 유닛 정보 섹션 */}
        <div className="space-y-6">
          <div className="border border-[#c3bdb4] p-4">
            <p className="text-sm text-[#c3bdb4] mb-2">UNIT DESIGNATION:</p>
            {isEditingNickname ? (
              <div className="flex gap-4">
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={newNumberPart}
                    onChange={handleNumberPartChange}
                    placeholder="00"
                    className="bg-[#454138] p-2 w-20 text-[#c3bdb4]"
                  />
                  <input
                    type="text"
                    value={newLetterPart}
                    onChange={handleLetterPartChange}
                    placeholder="A"
                    className="bg-[#454138] p-2 w-16 text-[#c3bdb4]"
                  />
                </div>
                <button
                  onClick={handleNicknameUpdate}
                  className="px-4 border border-[#c3bdb4] hover:bg-[#454138]"
                >
                  SAVE
                </button>
                <button
                  onClick={() => setIsEditingNickname(false)}
                  className="px-4 border border-[#c3bdb4] hover:bg-[#454138]"
                >
                  CANCEL
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-xl text-[#c3bdb4]">
                  {user?.nickname || "UNKNOWN"}
                </p>
                <button
                  onClick={() => {
                    setNewNumberPart(user?.nickname?.match(/\d+/)?.[0] || "");
                    setNewLetterPart(
                      user?.nickname?.match(/[A-Z]$/)?.[0] || ""
                    );
                    setIsEditingNickname(true);
                  }}
                  className="px-4 py-1 border border-[#c3bdb4] hover:bg-[#454138]"
                >
                  EDIT
                </button>
              </div>
            )}
          </div>

          <div className="border border-[#c3bdb4] p-4">
            <p className="text-sm text-[#c3bdb4] mb-2">EMAIL ADDRESS:</p>
            <p className="text-xl text-[#c3bdb4]">{user?.email || "UNKNOWN"}</p>
          </div>

          <div className="border border-[#c3bdb4] p-4">
            <p className="text-sm text-[#c3bdb4] mb-2">ACTIVATION DATE:</p>
            <p className="text-xl text-[#c3bdb4]">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "UNKNOWN"}
            </p>
          </div>
          <div className="border border-[#c3bdb4] p-4">
            <p className="text-sm text-[#c3bdb4] mb-2">LOG OUT FROM DB</p>
            <button
              onClick={() => {
                supabase.auth.signOut();
                navigate("/");
              }}
            >
              LOG OUT
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c3bdb4] to-transparent" />
      </div>
    </div>
  );
};

export default UnitInfoPage;
