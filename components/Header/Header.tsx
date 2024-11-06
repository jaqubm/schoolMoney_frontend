import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type HeaderProps = {
  buttonText?: string;
  onButtonClick?: () => void;
  // extraButtons?: { text: string; onClick: () => void }[];
  children?: ReactNode;
};

export const Header = ({
  // buttonText = "Login",
  // onButtonClick,
  // extraButtons = [],
  children,
}: HeaderProps) => {
  return (
    <nav className="flex justify-between items-center w-full p-4 border-b-0 relative z-20 bg-transparent text-white">
      <h1 className="text-2xl font-poppins text-white">
        School<span className="font-bold">Money</span>
      </h1>

      <div className="flex items-center gap-4">
        {/*  {extraButtons.map((button, index) => (*/}
        {/*    <Button*/}
        {/*      key={index}*/}
        {/*      variant="outline"*/}
        {/*      onClick={button.onClick}*/}
        {/*      className="px-4 py-2 btn-secondary"*/}
        {/*    >*/}
        {/*      {button.text}*/}
        {/*    </Button>*/}
        {/*  ))}*/}

        <div className="flex items-center gap-4">{children}</div>

        {/*<Button*/}
        {/*  variant="default"*/}
        {/*  onClick={onButtonClick}*/}
        {/*  className="px-4 py-2 btn-secondary"*/}
        {/*>*/}
        {/*  {buttonText}*/}
        {/*</Button>*/}
      </div>
    </nav>
  );
};
