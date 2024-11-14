import { Button } from "@/components/ui/button";

export const Sidebar = () => (
   <nav className="flex flex-col justify-between w-full h-full">
      <div>
         {[
            "Home",
            "Kids",
            "Fundraisers",
            "Balances",
            "History",
            "Classes",
         ].map((item) => (
            <Button key={item} variant="ghost" className="w-full h-[98px] text-[28px] font-[600]">
               {item}
            </Button>
         ))}
      </div>

      <div>
         <Button key="Profile" variant="ghost" className="w-full h-[98px] text-[28px] font-[600]">
            Profile
         </Button>
      </div>
   </nav>
);
