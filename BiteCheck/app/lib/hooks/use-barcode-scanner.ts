import { useRef, useState, useCallback, useEffect } from "react";

export function useBarcodeScan() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  
  // Mock function to simulate barcode scanning
  // In a real app, you would use a barcode scanner library like quagga.js
  const scanBarcode = useCallback(() => {
    if (!isScanning) return;
    
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // This is where actual barcode detection would happen
        // For this demo, we'll simulate a successful scan after 3 seconds
        setTimeout(() => {
          if (isScanning) {
            // Simulate finding a barcode "12345678"
            setScanResult("12345678");
            setIsScanning(false);
          }
        }, 3000);
      }
      
      // Continue scanning if still active
      if (isScanning) {
        requestAnimationFrame(scanBarcode);
      }
    }
  }, [isScanning]);
  
  const startScanning = useCallback(() => {
    if (videoRef.current) {
      // Reset previous results
      setScanResult(null);
      setIsScanning(true);
      
      // Start camera
      navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play()
            .then(() => {
              requestAnimationFrame(scanBarcode);
            })
            .catch(err => {
              console.error("Error playing video:", err);
            });
        }
      })
      .catch(err => {
        console.error("Error accessing camera:", err);
      });
    }
  }, [scanBarcode]);
  
  const stopScanning = useCallback(() => {
    setIsScanning(false);
    
    // Stop camera stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);
  
  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, [stopScanning]);
  
  return {
    videoRef,
    canvasRef,
    scanResult,
    isScanning,
    startScanning,
    stopScanning
  };
}
