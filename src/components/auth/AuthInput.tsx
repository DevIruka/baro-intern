type AuthInputProps = {
  type: "email" | "password" | "text";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
};

const AuthInput = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  required = true,
}: AuthInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      className="w-full bg-[#1a1a1a] border border-[#c3bdb4] p-4 text-[#c3bdb4] placeholder-[#707070]
                           focus:outline-none focus:border-[#e2dcd5] transition-colors tracking-wider text-lg text-center"
      autoComplete="off"
    />
  );
};

export default AuthInput;
