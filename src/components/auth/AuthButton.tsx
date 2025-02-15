type AuthButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

const AuthButton = ({
  type = "submit",
  onClick,
  children,
  disabled = false,
}: AuthButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full p-4 border-2 border-[#c3bdb4] 
                    hover:text-[#c3bdb4] transition-colors tracking-widest
                       disabled:opacity-50 disabled:cursor-not-allowed text-lg"
    >
      {children}
    </button>
  );
};

export default AuthButton;
