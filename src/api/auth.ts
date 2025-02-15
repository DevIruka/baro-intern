import { LoginCredentials } from "../types/auth.types";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await fetch("YOUR_API_URL/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    return response.json();
  },

  getProfile: async (token: string) => {
    const response = await fetch("YOUR_API_URL/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("프로필을 가져오는데 실패했습니다.");
    }

    return response.json();
  },
};
