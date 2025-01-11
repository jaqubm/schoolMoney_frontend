import { ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type HeaderProps = {
    buttonText?: string;
    onButtonClick?: () => void;
    children?: ReactNode;
    withBorder?: boolean;
};

export const Header = ({ children, withBorder = false }: HeaderProps) => {
    const router = useRouter();

    const handleLogoClick = () => {
        const token = Cookies.get('access_token');
        if (token) {
            router.push('/home');
        } else {
            router.push('/');
        }
    };

    return (
        <nav
            className={`flex h-24 justify-between items-center w-full p-4 relative z-20 ${
                withBorder ? 'border-b' : 'border-b-0'
            }`}
        >
            <button
                onClick={handleLogoClick}
                className="text-2xl font-poppins text-secondary text-white"
            >
                School<span className="font-bold">Money</span>
            </button>

            {children}
        </nav>
    );
};
