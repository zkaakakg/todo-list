interface CommonButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

const CommonButton = ({
  children,
  type = "button",
  onClick,
  className = "",
}: CommonButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-black text-white w-40 text-sm font-semibold py-1.5 px-3 hover:opacity-70 rounded mx-auto block ${className}`}
    >
      {children}
    </button>
  );
};

export default CommonButton;
