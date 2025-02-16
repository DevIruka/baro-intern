import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginForm from "../auth/LoginForm";

// 모의 login 함수 생성
const mockLogin = jest.fn();

// useLogin 훅의 기본 반환값
let mockUseLoginReturn = {
  login: mockLogin,
  isPending: false,
  isError: false,
  error: null,
};

// useLogin 훅 모킹
jest.mock("../../hooks/useAuth", () => ({
  useLogin: () => mockUseLoginReturn,
}));

// 테스트를 위한 QueryClient 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // 각 테스트 전에 기본값으로 초기화
    mockUseLoginReturn = {
      login: mockLogin,
      isPending: false,
      isError: false,
      error: null,
    };
  });

  test("로그인 폼이 올바르게 렌더링되어야 함", () => {
    render(<LoginForm />, { wrapper });

    // 이메일, 비밀번호 입력 필드와 로그인 버튼이 존재하는지 확인
    expect(screen.getByPlaceholderText("EMAIL")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("PASSWORD")).toBeInTheDocument();
    expect(screen.getByText("AUTHENTICATE")).toBeInTheDocument();
  });

  test("입력 필드에 값을 입력할 수 있어야 함", () => {
    render(<LoginForm />, { wrapper });

    const emailInput = screen.getByPlaceholderText("EMAIL");
    const passwordInput = screen.getByPlaceholderText("PASSWORD");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  test("로딩 중일 때 버튼 텍스트가 변경되어야 함", () => {
    // useLogin 반환값 직접 수정
    mockUseLoginReturn = {
      login: mockLogin,
      isPending: true,
      isError: false,
      error: null,
    };

    render(<LoginForm />, { wrapper });
    expect(screen.getByText("CONNECTING...")).toBeInTheDocument();
  });

  test("에러가 발생했을 때 에러 메시지가 표시되어야 함", () => {
    // useLogin 반환값 직접 수정
    mockUseLoginReturn = {
      login: mockLogin,
      isPending: false,
      isError: true,
      error: null
    };

    render(<LoginForm />, { wrapper });
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  test("폼 제출 시 login 함수가 호출되어야 함", async () => {
    render(<LoginForm />, { wrapper });

    const emailInput = screen.getByPlaceholderText("EMAIL");
    const passwordInput = screen.getByPlaceholderText("PASSWORD");
    const submitButton = screen.getByText("AUTHENTICATE");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});
