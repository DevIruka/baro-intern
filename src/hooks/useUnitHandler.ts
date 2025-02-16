import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { User } from "../types/auth.types";

interface UseUnitHandlerProps {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUnitHandler = ({ user, setUser }: UseUnitHandlerProps) => {
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNumberPart, setNewNumberPart] = useState(
    user?.nickname ? user.nickname.match(/\d+/)?.[0] || "" : ""
  );
  const [newLetterPart, setNewLetterPart] = useState(
    user?.nickname ? user.nickname.match(/[A-Z]$/)?.[0] || "" : ""
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleNicknameUpdate = async () => {
    try {
      const combinedNickname = `${newNumberPart}${newLetterPart}`;
      const { error } = await supabase.auth.updateUser({
        data: { nickname: combinedNickname },
      });

      if (error) throw error;

      if (user) {
        setUser({
          ...user,
          nickname: combinedNickname,
        });
      }

      setIsEditingNickname(false);
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  const handleNumberPartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = e.target.value.replace(/\D/g, "");
    if (
      numberValue === "" ||
      (parseInt(numberValue) > 0 && parseInt(numberValue) <= 99)
    ) {
      setNewNumberPart(numberValue);
    }
  };

  const handleLetterPartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const letterValue = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
    setNewLetterPart(letterValue.slice(0, 1));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("profile_img")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("profile_img").getPublicUrl(fileName);

      const { error: updateError } = await supabase.auth.updateUser({
        data: { img_url: publicUrl },
      });

      if (updateError) throw updateError;

      if (user) {
        setUser({
          ...user,
          img_url: publicUrl,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return {
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
  };
};
