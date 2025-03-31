import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AppContext } from "../lib/context/app-context";
import { useBarcodeScan } from "../lib/hooks/use-barcode-scanner";
import { useLocation } from "wouter";

export function Scan() {
  const { setCurrentPage } = useContext(AppContext);
  const [, navigate] = useLocation();
  const [scannerActive, setScannerActive] = useState(false);
  
  useEffect(() => {
    setCurrentPage("Scan Product");
  }, [setCurrentPage]);

  const { videoRef, canvasRef, startScanning, stopScanning, scanResult } = useBarcodeScan();

  useEffect(() => {
    if (scanResult) {
      // We found a barcode, now go to the product details
      console.log("Barcode scanned:", scanResult);
      
      // TODO: In a real app, we would fetch the product by barcode
      // For now, just navigate to a sample product
      navigate("/product/1");
    }
  }, [scanResult, navigate]);

  const handleStartScan = () => {
    setScannerActive(true);
    startScanning();
  };

  const handleStopScan = () => {
    setScannerActive(false);
    stopScanning();
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="mb-4 text-center">
        <h2 className="text-lg font-semibold">Scan Product</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Position barcode within the frame</p>
      </div>
      
      <div className="relative w-full h-64 mb-6 bg-neutral dark:bg-gray-700 rounded-xl overflow-hidden">
        {/* Camera Frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          {scannerActive ? (
            <>
              <video 
                ref={videoRef} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <canvas 
                ref={canvasRef} 
                className="hidden"
              />
            </>
          ) : (
            <div className="bg-gray-800 bg-opacity-40 absolute inset-0 flex items-center justify-center">
              <p className="text-white text-center px-4">
                Tap "Scan Barcode" to activate the camera
              </p>
            </div>
          )}
          
          <div className="border-2 border-white dark:border-gray-300 w-56 h-56 rounded-lg flex flex-col items-center justify-center z-10">
            <div className="w-8 h-8 border-t-2 border-l-2 border-primary absolute top-0 left-0 -m-1"></div>
            <div className="w-8 h-8 border-t-2 border-r-2 border-primary absolute top-0 right-0 -m-1"></div>
            <div className="w-8 h-8 border-b-2 border-l-2 border-primary absolute bottom-0 left-0 -m-1"></div>
            <div className="w-8 h-8 border-b-2 border-r-2 border-primary absolute bottom-0 right-0 -m-1"></div>
          </div>
          
          {/* Red scanning line animation */}
          {scannerActive && (
            <div className="absolute left-0 right-0 h-0.5 bg-red-500 top-1/2 transform -translate-y-1/2 animate-pulse"></div>
          )}
        </div>
      </div>
      
      <Button 
        className="w-full max-w-xs mb-4" 
        onClick={scannerActive ? handleStopScan : handleStartScan}
      >
        {scannerActive ? "Stop Scanning" : "Scan Barcode"}
      </Button>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Or choose an option below</p>
      
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        <button className="py-2 px-4 bg-white dark:bg-gray-800 text-primary border border-primary rounded-lg text-sm font-medium">
          <i className="fas fa-folder-open mr-2"></i>
          From Gallery
        </button>
        <button className="py-2 px-4 bg-white dark:bg-gray-800 text-primary border border-primary rounded-lg text-sm font-medium">
          <i className="fas fa-history mr-2"></i>
          Recently Scanned
        </button>
      </div>
    </div>
  );
}

export default Scan;