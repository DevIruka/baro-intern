import { useState } from "react";
import { useLogin } from "../../hooks/useAuth";
import { LoginCredentials } from "../../types/auth.types";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

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
          className="relative p-8 border-2 border-[#c3bdb4] bg-[#4b4a45]"
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
              {isPending ? "CONNECTING..." : "AUTHENTICATE"}
            </AuthButton>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c3bdb4] to-transparent" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
