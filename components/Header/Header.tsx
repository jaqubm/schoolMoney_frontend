import { ReactNode } from "react";

type HeaderProps = {
  buttonText?: string;
  onButtonClick?: () => void;
  children?: ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
  return (
    <nav className="flex justify-between items-center w-full p-4 border-b-0 relative z-20 bg-transparent text-white">
      <h1 className="text-2xl font-poppins text-white">
        School<span className="font-bold">Money</span>
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">{children}</div>
      </div>
    </nav>
  );
};
