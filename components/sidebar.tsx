import { Button } from "@/components/ui/button";

export const Sidebar = () => (
  <div className="flex bg-white w-[339px] h-full">
    <nav>
      {[
        "Home",
        "Kids",
        "Fundraisers",
        "Balances",
        "History",
        "Classes",
        "Profile",
      ].map((item) => (
        <Button key={item} className="w-full">
            {item}
        </Button>
      ))}
    </nav>
  </div>
);
