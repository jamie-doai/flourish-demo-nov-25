import { Link } from "react-router-dom";
import { HardHat, Briefcase, Menu } from "lucide-react";
import { useBottomNavContext } from "@/contexts/BottomNavContext";

export function DevBar() {
  const { useBottomNav, toggleBottomNav } = useBottomNavContext();

  return (
    <div className="bg-primary text-primary-foreground py-2 border-b border-primary/20">
      <div className="container mx-auto px-4 flex items-center gap-4 text-sm">
        <span className="font-semibold">Dev Mode:</span>
        <Link 
          to="/workers" 
          className="flex items-center gap-2 px-3 py-1 rounded hover:bg-white/10 transition-colors"
        >
          <HardHat className="w-4 h-4" />
          Workers View
        </Link>
        <Link 
          to="/managers" 
          className="flex items-center gap-2 px-3 py-1 rounded hover:bg-white/10 transition-colors"
        >
          <Briefcase className="w-4 h-4" />
          Managers View
        </Link>
        <button
          onClick={toggleBottomNav}
          className={`flex items-center gap-2 px-3 py-1 rounded transition-colors ${
            useBottomNav ? "bg-white/20" : "hover:bg-white/10"
          }`}
        >
          <Menu className="w-4 h-4" />
          {useBottomNav ? "Standard Nav" : "Bottom Nav"}
        </button>
      </div>
    </div>
  );
}
