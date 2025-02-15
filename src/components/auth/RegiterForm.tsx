import { useState } from "react";
import { useSignup } from "../../hooks/useAuth";
import { SignupCredentials } from "../../types/auth.types";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { useAuthStore } from "../../store/authStore";

const RegiterForm = () => {
  const nav = useNavigate();
  const { setUser } = useAuthStore();
  const [credentials, setCredentials] = useState<SignupCredentials>({
    email: "",
    password: "",
    nickname: "",
    numberPart: "",
    letterPart: "",
  });

  const { signup, isPending, isError, error, data } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedNickname = `${credentials.numberPart}${credentials.letterPart}`;
    signup({
      ...credentials,
      nickname: combinedNickname,
    });
    if (data?.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || null,
        nickname: data.user.user_metadata.nickname || null,
        created_at: data.user.created_at,
        img_url: data.user.user_metadata.img_url || null,
      });
    }
    nav("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "numberPart") {
      const numberValue = value.replace(/\D/g, "");
      if (
        numberValue === "" ||
        (parseInt(numberValue) > 0 && parseInt(numberValue) <= 99)
      ) {
        setCredentials((prev) => ({ ...prev, [name]: numberValue }));
      }
    } else if (name === "letterPart") {
      const letterValue = value.toUpperCase().replace(/[^A-Z]/g, "");
      setCredentials((prev) => ({ ...prev, [name]: letterValue.slice(0, 1) }));
    } else {
      setCredentials((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-[800px] mx-4">
        <form
          onSubmit={handleSubmit}
          className="relative p-8 border-2 border-[#c3bdb4] bg-[#2b2b2b]/80"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c3bdb4] to-transparent" />

          {isError && (
            <div className="text-[#ff6b6b] font-light mb-10 p-2 border border-[#ff6b6b] text-sm tracking-wide">
              {error instanceof Error
                ? error.message
                : "AN ERROR OCCURRED DURING SIGNUP"}
            </div>
          )}

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <AuthInput
                  type="text"
                  placeholder="00"
                  value={credentials.numberPart}
                  onChange={handleChange}
                  name="numberPart"
                />
                <span className="absolute -top-6 left-0 text-[#c3bdb4] text-sm">
                  UNIT NUMBER (1-99)
                </span>
              </div>
              <div className="relative w-32">
                <AuthInput
                  type="text"
                  placeholder="A"
                  value={credentials.letterPart}
                  onChange={handleChange}
                  name="letterPart"
                />
                <span className="absolute -top-6 left-0 text-[#c3bdb4] text-sm">
                  ID CODE (A-Z)
                </span>
              </div>
            </div>
              <AuthInput
                type="email"
                placeholder="EMAIL"
                value={credentials.email}
                onChange={handleChange}
                name="email"
              />
              <AuthInput
                type="password"
                placeholder="PASSWORD"
                value={credentials.password}
                onChange={handleChange}
                name="password"
              />
            <AuthButton type="submit" disabled={isPending}>
              {isPending ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </AuthButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegiterForm;
