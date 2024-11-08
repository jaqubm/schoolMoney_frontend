import { Button } from "@/components/ui/button";

export const Sidebar = () => (
  <div className="absolute w-[339px] p-4 bg-white top-[151px] h-full">
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
