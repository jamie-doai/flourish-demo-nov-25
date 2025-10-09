import { Link } from "react-router-dom";
import { HardHat, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Greenhouse Management System</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/workers">
            <Button size="lg" className="w-48">
              <HardHat className="w-5 h-5 mr-2" />
              Workers View
            </Button>
          </Link>
          
          <Link to="/managers">
            <Button size="lg" variant="outline" className="w-48">
              <Briefcase className="w-5 h-5 mr-2" />
              Managers View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
