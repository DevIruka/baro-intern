import { renderHook, act } from "@testing-library/react";
import { useUnitHandler } from "../useUnitHandler";
import { supabase } from "../../api/supabaseClient";

// supabase 모킹
jest.mock("../../api/supabaseClient", () => ({
  supabase: {
    auth: {
      updateUser: jest.fn(),
    },
    storage: {
      from: jest.fn(() => ({
        upload: jest.fn(),
        getPublicUrl: jest.fn(),
      })),
    },
  },
}));

describe("useUnitHandler", () => {
  const mockUser = {
    id: "test-id",
    nickname: "42A",
    email: "test@test.com",
    created_at: "2024-01-01",
    img_url: null,
  };

  const mockSetUser = jest.fn();

  beforeEach(() => {
    // 각 테스트 전에 모든 모의 함수 초기화
    jest.clearAllMocks();
  });

  test("닉네임 초기값이 올바르게 설정되어야 함", () => {
    const { result } = renderHook(() =>
      useUnitHandler({ user: mockUser, setUser: mockSetUser })
    );

    expect(result.current.newNumberPart).toBe("42");
    expect(result.current.newLetterPart).toBe("A");
  });

  test("숫자 부분 입력이 올바르게 처리되어야 함", () => {
    const { result } = renderHook(() =>
      useUnitHandler({ user: mockUser, setUser: mockSetUser })
    );

    act(() => {
      result.current.handleNumberPartChange({
        target: { value: "55" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.newNumberPart).toBe("55");
  });

  test("잘못된 숫자 입력은 무시되어야 함", () => {
    const { result } = renderHook(() =>
      useUnitHandler({ user: mockUser, setUser: mockSetUser })
    );

    act(() => {
      result.current.handleNumberPartChange({
        target: { value: "100" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.newNumberPart).toBe("42"); // 원래 값 유지
  });

  test("닉네임 업데이트가 성공적으로 처리되어야 함", async () => {
    (supabase.auth.updateUser as jest.Mock).mockResolvedValueOnce({
      error: null,
    });

    const { result } = renderHook(() =>
      useUnitHandler({ user: mockUser, setUser: mockSetUser })
    );

    await act(async () => {
      await result.current.handleNicknameUpdate();
    });

    expect(supabase.auth.updateUser).toHaveBeenCalledWith({
      data: { nickname: "42A" },
    });
    expect(mockSetUser).toHaveBeenCalled();
    expect(result.current.isEditingNickname).toBe(false);
  });
});
