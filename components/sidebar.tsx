import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Sidebar = () => (
  <div className="w-64 h-screen p-4 bg-white shadow-lg flex flex-col space-y-6">
    <h2 className="text-2xl font-bold">SchoolMoney</h2>
    <nav className="space-y-4">
      {[
        "Home",
        "Kids",
        "Fundraisers",
        "Balances",
        "History",
        "Classes",
        "Profile",
      ].map((item) => (
        <Link key={item} href={`/${item.toLowerCase()}`}>
          <Button variant="ghost" className="w-full text-left">
            {item}
          </Button>
        </Link>
      ))}
    </nav>
  </div>
);
