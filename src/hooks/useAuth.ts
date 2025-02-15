import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { authApi } from '../api/auth';

export function useLogin() {
  const { login } = useAuthStore();

  const {
    mutate,
    isPending,
    isError,
    error,
    data,
    reset
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: authApi.login,
    onSuccess: (data) => {
      login(data.user, data.token);
    },
  });

  return {
    login: mutate,
    isPending,
    isError,
    error,
    data,
    reset
  };
}

export function useUserProfile() {
  const { accessToken } = useAuthStore();

  const {
    data: profile,
    isError,
    error,
    isPending,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => authApi.getProfile(accessToken!),
    enabled: !!accessToken,
  });

  return {
    profile,
    isError,
    error,
    isPending,
    isFetching,
    refetch
  };
}