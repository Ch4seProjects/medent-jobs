interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ text, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`border w-56 py-4 rounded-md bg-black text-white font-semibold cursor-pointer ${className ?? ""}`}
      {...props}
    >
      {text}
    </button>
  );
}
