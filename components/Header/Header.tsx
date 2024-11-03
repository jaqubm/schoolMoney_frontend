import { Button } from "@/components/ui/button";

type HeaderProps = {
    title?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    extraButtons?: { text: string; onClick: () => void }[];
};

export const Header = ({
                           title = "SchoolMoney",
                           buttonText = "Login",
                           onButtonClick,
                           extraButtons = [],
                       }: HeaderProps) => {
    return (
        <nav className="flex justify-between items-center w-full p-4 border-b-0 shadow-sm relative z-20 bg-transparent text-white">
            <h1 className="ml-4 text-2xl font-bold text-secondary">{title}</h1>

            <div className="flex items-center gap-4">
                {extraButtons.map((button, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        onClick={button.onClick}
                        className="text-sm px-4 py-2"
                    >
                        {button.text}
                    </Button>
                ))}

                <Button variant="default" onClick={onButtonClick} className="px-4 py-2 font-poppins bg-button-bg text-button-text rounded-lg">
                    {buttonText}
                </Button>
            </div>
        </nav>
    );
};
