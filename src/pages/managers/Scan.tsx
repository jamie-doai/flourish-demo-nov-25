import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { ArrowLeft, Camera, Maximize2 } from "lucide-react";

export default function ManagerScan() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  // Simulate scanning - in real app, this would use device camera
  const handleScanDemo = () => {
    setScanning(true);
    setTimeout(() => {
      // Simulate successful scan
      navigate("/workers/batch/BATCH_MAN_WAI_01");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      
      <header className="bg-card border-b sticky top-0 z-40">
        <div className="container mx-auto px-12 py-4 max-w-[1920px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/managers">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Scan Batch</h1>
            </div>
            <Button variant="ghost" size="icon">
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-12 py-8 max-w-[1920px] flex flex-col items-center justify-center min-h-[70vh]">
        {/* Camera Preview Placeholder */}
        <div className="relative w-full max-w-sm aspect-square bg-muted/50 rounded-2xl border-2 border-border mb-8 overflow-hidden">
          {scanning ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-muted-foreground/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Scanning Frame */}
              <div className="absolute inset-8 border-2 border-primary rounded-lg">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-primary"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-primary"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-primary"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-primary"></div>
              </div>

              {/* Scanning Line Animation */}
              <div className="absolute inset-8">
                <div className="w-full h-0.5 bg-primary animate-pulse"></div>
              </div>

              {/* Camera Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-12 h-12 text-muted-foreground/30" />
              </div>
            </>
          )}
        </div>

        <div className="text-center mb-8">
          <p className="text-foreground text-lg font-medium mb-2">
            {scanning ? "Scanning..." : "Point camera at batch QR code"}
          </p>
          <p className="text-muted-foreground text-sm">
            Position the code within the frame
          </p>
        </div>

        {/* Demo Button - Remove in production */}
        <Button 
          onClick={handleScanDemo}
          disabled={scanning}
          className="px-8"
        >
          {scanning ? "Scanning..." : "Simulate Scan (Demo)"}
        </Button>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-xs">
            💡 Camera access required
          </p>
        </div>
      </main>
    </div>
  );
}
