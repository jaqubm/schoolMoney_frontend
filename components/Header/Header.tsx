import { ReactNode } from "react";

type HeaderProps = {
  buttonText?: string;
  onButtonClick?: () => void;
  children?: ReactNode;
  withBorder?: boolean;
};

export const Header = ({ children, withBorder = false }: HeaderProps) => {
  return (
    <nav className="flex h-24 justify-between items-center w-full p-4 border-b">
      <h1 className="text-2xl font-poppins text-secondary">
        School<span className="font-bold">Money</span>
      </h1>

      {children}
    </nav>
  );
};
