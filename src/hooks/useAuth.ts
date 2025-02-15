import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { supabase } from "../api/supabaseClient";
import { authApi } from "../api/auth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const nav = useNavigate();
  const { setUser } = useAuthStore();
  const { mutate, isPending, isError, error, data, reset } = useMutation({
    mutationKey: ["login"],
    mutationFn: authApi.signInWithPassword,
    onSuccess: (data) => {
      setUser({
        id: data.user.id,
        email: data.user.email || null,
        nickname: data.user.user_metadata.nickname || null,
        created_at: data.user.created_at,
        img_url: data.user.user_metadata.img_url || null,
      });
      nav("/");
    },
  });

  return {
    login: mutate,
    isPending,
    isError,
    error,
    data,
    reset,
  };
}

export function useSignup() {
  const nav = useNavigate();
  const { setUser } = useAuthStore();
  const { mutate, isPending, isError, error, data } = useMutation({
    mutationKey: ["signup"],
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      setUser({
        id: data.user?.id || "",
        email: data.user?.email || null,
        nickname: data.user?.user_metadata.nickname || null,
        created_at: data.user?.created_at || "",
        img_url: data.user?.user_metadata.img_url || null,
      });
      nav("/");
    },
  });

  return {
    signup: mutate,
    isPending,
    isError,
    error,
    data,
  };
}

export function useUserProfile() {
  const { user } = useAuthStore();
  const {
    data: profile,
    isError,
    error,
    isPending,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    },
    enabled: !!user,
  });

  return {
    profile,
    isError,
    error,
    isPending,
    isFetching,
    refetch,
  };
}
