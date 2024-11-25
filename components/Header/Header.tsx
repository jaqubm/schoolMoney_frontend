import { ReactNode } from "react";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

type HeaderProps = {
  buttonText?: string;
  onButtonClick?: () => void;
  children?: ReactNode;
  withBorder?: boolean;
};

export const Header = ({ children, withBorder = false }: HeaderProps) => {
  const router = useRouter();

  const handleLogoClick = () => {
    const token = Cookies.get("access_token");
    if (token) {
      router.push("/home");
    } else {
      router.push("/");
    }
  };

  return (
    <nav className={`flex justify-between items-center w-full p-4 relative z-20 bg-transparent text-white ${
       withBorder ? "border-b" : "border-b-0"
    }`}>
      <button
         className="text-2xl font-poppins text-white"
         onClick={handleLogoClick}
      >
        School<span className="font-bold">Money</span>
      </button>

      {children}
    </nav>
  );
};
