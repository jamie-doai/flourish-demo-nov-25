import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WorkerBottomNav } from "@/components/WorkerBottomNav";
import { DevBar } from "@/components/DevBar";
import { ArrowLeft, Camera, Maximize2 } from "lucide-react";

export default function WorkerScan() {
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
    <div className="min-h-screen bg-[#37474F]">
      <div className="max-w-[500px] mx-auto bg-[#37474F] min-h-screen pb-20">
        <DevBar />
      <header className="bg-[#37474F] text-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/workers">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-3 h-3" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Scan Batch</h1>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Maximize2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[70vh]">
        {/* Camera Preview Placeholder */}
        <div className="relative w-full max-w-sm aspect-square bg-[#37474F]/50 rounded-2xl border-2 border-white/20 mb-8 overflow-hidden">
          {scanning ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Scanning Frame */}
              <div className="absolute inset-8 border-2 border-[#81C784] rounded-lg">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#81C784]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#81C784]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#81C784]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#81C784]"></div>
              </div>

              {/* Scanning Line Animation */}
              <div className="absolute inset-8">
                <div className="w-full h-0.5 bg-[#81C784] animate-pulse"></div>
              </div>

              {/* Camera Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-12 h-12 text-white/30" />
              </div>
            </>
          )}
        </div>

        <div className="text-center mb-8">
          <p className="text-white text-lg font-medium mb-2">
            {scanning ? "Scanning..." : "Point camera at batch QR code"}
          </p>
          <p className="text-white/70 text-sm">
            Position the code within the frame
          </p>
        </div>

        {/* Demo Button - Remove in production */}
        <Button 
          onClick={handleScanDemo}
          disabled={scanning}
          className="bg-[#3B7A57] hover:bg-[#3B7A57]/90 text-white px-8"
        >
          {scanning ? "Scanning..." : "Simulate Scan (Demo)"}
        </Button>

        <div className="mt-8 text-center">
          <p className="text-white/50 text-xs">
            💡 Camera access required
          </p>
        </div>
      </main>

      <WorkerBottomNav />
      </div>
    </div>
  );
}
