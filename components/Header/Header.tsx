import { ReactNode } from "react";

type HeaderProps = {
  buttonText?: string;
  onButtonClick?: () => void;
  children?: ReactNode;
  withBorder?: boolean;
};

export const Header = ({ children, withBorder = false }: HeaderProps) => {
  return (
    <nav className={`flex justify-between items-center w-full p-4 relative z-20 bg-transparent text-white ${
       withBorder ? "border-b" : "border-b-0"
    }`}>
      <h1 className="text-2xl font-poppins text-white">
        School<span className="font-bold">Money</span>
      </h1>

      {children}
    </nav>
  );
};
