import { useNavigate } from "react-router-dom";

interface NavButtonProps {
  number: string;
  title: string;
  description: string;
  to: string;
}

const NavButton = ({ number, title, description, to }: NavButtonProps) => {
  const nav = useNavigate();

  return (
    <button
      className="w-full p-8 text-left hover:bg-[#454138] hover:text-[#dcd8c0] transition-all"
      onClick={() => nav(to)}
    >
      <p className="text-sm tracking-widest mb-2">{number}</p>
      <p className="text-xl mb-4">{title}</p>
      <p className="text-sm opacity-70">{description}</p>
    </button>
  );
};

export default NavButton;
