import { useState } from "react";
import { useLogin } from "../../hooks/useAuth";
import { LoginCredentials } from "../../types/auth.types";

const LoginForm = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const { login, isPending, isError, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            <div className="text-[#ff6b6b] font-light mb-4 p-2 border border-[#ff6b6b] text-sm tracking-wide">
              {error instanceof Error
                ? error.message
                : "AN ERROR OCCURRED DURING LOGIN"}
            </div>
          )}

          <div className="space-y-8">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="EMAIL"
                className="w-full bg-[#1a1a1a] border border-[#c3bdb4] p-4 text-[#c3bdb4] placeholder-[#707070]
                         focus:outline-none focus:border-[#e2dcd5] transition-colors tracking-wider text-lg"
              />
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="PASSWORD"
                className="w-full bg-[#1a1a1a] border border-[#c3bdb4] p-4 text-[#c3bdb4] placeholder-[#707070]
                         focus:outline-none focus:border-[#e2dcd5] transition-colors tracking-wider text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full p-4 border-2 border-[#c3bdb4] bg-[#1a1a1a] text-[#c3bdb4] 
                       hover:bg-[#c3bdb4] hover:text-[#1a1a1a] transition-colors tracking-widest
                       disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isPending ? "CONNECTING..." : "AUTHENTICATE"}
            </button>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c3bdb4] to-transparent" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
