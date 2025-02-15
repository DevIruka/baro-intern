import { LoginCredentials, SignupCredentials } from "../types/auth.types";
import { supabase } from "./supabaseClient";

export const authApi = {
  //로그인 로직
  signInWithPassword: async (credentials: LoginCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      throw new Error(error.message);
    }
      console.log("data", data);
    return data;
  },

  //회원가입 로직
  signup: async (credentials: SignupCredentials) => {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          nickname: credentials.nickname,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
