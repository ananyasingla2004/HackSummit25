import { useEffect, useRef } from "react";

interface OilJarProps {
  /** Palm oil amount in mL */
  amount: number;
  /** Maximum capacity in mL (default: 50) */
  maxCapacity?: number;
  /** Width of the jar in pixels (default: 180) */
  width?: number;
  /** Height of the jar in pixels (default: 250) */
  height?: number;
  /** Whether to animate the filling (default: true) */
  animate?: boolean;
}

export function OilJar({
  amount,
  maxCapacity = 50,
  width = 180,
  height = 250,
  animate = true,
}: OilJarProps) {
  const fillPathRef = useRef<SVGPathElement>(null);
  
  // Calculate the fill percentage (0-1)
  const fillPercentage = Math.min(Math.max(amount / maxCapacity, 0), 1);
  
  // Calculate the fill height
  const fillHeight = Math.round(180 * fillPercentage);
  const yPosition = 220 - fillHeight;
  
  // Determine color based on amount
  let fillColor = "#4CAF50"; // Green for low
  if (fillPercentage > 0.7) {
    fillColor = "#F44336"; // Red for high
  } else if (fillPercentage > 0.3) {
    fillColor = "#FFC107"; // Yellow for medium
  }
  
  // Animation effect
  useEffect(() => {
    if (!animate || !fillPathRef.current) return;
    
    const path = fillPathRef.current;
    
    // Store original position
    const originalY = yPosition;
    
    // Start from bottom
    path.setAttribute("d", `M43,220 L43,220 C43,237 52,247 90,247 C128,247 137,237 137,220 L137,220 Z`);
    
    // Animate to the target position
    setTimeout(() => {
      path.setAttribute("d", `M43,${originalY} L43,220 C43,237 52,247 90,247 C128,247 137,237 137,220 L137,${originalY} Z`);
    }, 100);
  }, [amount, yPosition, animate]);

  return (
    <div className="oil-jar relative mx-auto">
      <svg width={width} height={height} viewBox="0 0 180 250">
        {/* Jar Outline */}
        <path 
          className="jar-outline"
          d="M40,60 C40,40 50,30 90,30 C130,30 140,40 140,60 L140,220 C140,240 130,250 90,250 C50,250 40,240 40,220 Z" 
          stroke="#333" 
          strokeWidth="3" 
          fill="none"
        />
        
        {/* Liquid - height is dynamic */}
        <path 
          ref={fillPathRef}
          className="jar-liquid transition-all duration-1000 ease-in-out"
          d={`M43,${yPosition} L43,220 C43,237 52,247 90,247 C128,247 137,237 137,220 L137,${yPosition} Z`}
          fill={fillColor}
        />
        
        {/* Jar Cap */}
        <path 
          d="M50,30 L130,30 L130,15 C130,5 120,0 90,0 C60,0 50,5 50,15 Z" 
          fill="#BBBBBB" 
          stroke="#333" 
          strokeWidth="2"
        />
      </svg>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
        <div className="text-3xl font-bold">{amount} mL</div>
        <div className="text-sm">palm oil</div>
      </div>
    </div>
  );
}

export default OilJar;