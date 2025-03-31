import { useContext, useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/lib/context/app-context";
import { OilJar } from "@/components/ui/oil-jar";
import { LogConsumptionModal } from "@/components/modals/log-consumption-modal";

export function ProductDetails() {
  const { setCurrentPage } = useContext(AppContext);
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const [, navigate] = useLocation();

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  useEffect(() => {
    setCurrentPage("Product Details");
  }, [setCurrentPage]);

  // Fetch product details
  const { data: product, isLoading } = useQuery({
    queryKey: ['/api/products', productId],
    enabled: !!productId,
  });

  // Fetch alternatives
  const { data: alternatives, isLoading: isAlternativesLoading } = useQuery({
    queryKey: [`/api/products/${productId}/alternatives`],
    enabled: !!productId,
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center">
        <div className="text-lg font-medium text-gray-600 dark:text-gray-400">
          Product not found
        </div>
        <Button className="mt-4" onClick={() => navigate("/dashboard")}>
          Go Back
        </Button>
      </div>
    );
  }

  // Determine warning level
  const warningLevel = product.palmOilStatus === 0 ? "Low" : 
                      product.palmOilStatus === 1 ? "Moderate" : "High";
  
  const warningColor = product.palmOilStatus === 0 ? "bg-primary" : 
                      product.palmOilStatus === 1 ? "bg-warning" : "bg-destructive";
  
  const warningTextColor = product.palmOilStatus === 0 ? "text-primary" : 
                          product.palmOilStatus === 1 ? "text-warning" : "text-destructive";

  const warningIcon = product.palmOilStatus === 0 ? "fas fa-check-circle" : 
                     product.palmOilStatus === 1 ? "fas fa-exclamation-triangle" : "fas fa-times-circle";

  return (
    <div className="pb-20">
      {/* Product Header */}
      <div className="px-4 py-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="flex items-start">
          <div className="bg-neutral dark:bg-gray-700 w-16 h-16 rounded-lg flex items-center justify-center mr-4">
            {product.imageUrl && (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-14 h-14 object-cover rounded"
              />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{product.name}</h1>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {product.brand || "Unknown Brand"}
            </div>
            
            <div className="flex items-center mt-1">
              <div className={`px-2 py-0.5 ${warningColor} bg-opacity-20 rounded text-xs font-medium ${warningTextColor}`}>
                <i className={`${warningIcon} mr-1`}></i>
                <span>{warningLevel} Palm Oil</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Palm Oil Visualization */}
      <div className="px-4 py-6 bg-white dark:bg-gray-800 mt-2">
        <h2 className="text-lg font-semibold mb-4">Palm Oil Content</h2>
        
        <OilJar amount={product.palmOilContent} />
        
        <div className={`${warningColor} bg-opacity-10 p-3 rounded-lg flex items-start mb-4`}>
          <i className={`${warningIcon} ${warningTextColor} mt-0.5 mr-3`}></i>
          <div>
            <div className="text-sm font-medium">
              {warningLevel === "Low" ? "Low Palm Oil Detected" : 
               warningLevel === "Moderate" ? "Moderate Palm Oil Detected" : 
               "High Palm Oil Detected"}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {warningLevel === "Low" ? "Good choice! This product contains little to no palm oil." : 
               warningLevel === "Moderate" ? "Regular consumption may impact health and contribute to environmental concerns." : 
               "This product contains high amounts of palm oil which may lead to health issues with regular consumption."}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 text-center mb-4">
          <div className="bg-neutral dark:bg-gray-700 p-2 rounded">
            <div className="text-xs text-gray-600 dark:text-gray-400">Calories</div>
            <div className="font-medium">{product.calories || "N/A"} kcal</div>
          </div>
          <div className="bg-neutral dark:bg-gray-700 p-2 rounded">
            <div className="text-xs text-gray-600 dark:text-gray-400">Fat</div>
            <div className="font-medium">{product.fat || "N/A"}g</div>
          </div>
          <div className="bg-neutral dark:bg-gray-700 p-2 rounded">
            <div className="text-xs text-gray-600 dark:text-gray-400">Serving Size</div>
            <div className="font-medium">{product.servingSize || "1 serving"}</div>
          </div>
        </div>
      </div>
      
      {/* Healthier Alternatives */}
      <div className="px-4 py-6 bg-white dark:bg-gray-800 mt-2">
        <h2 className="text-lg font-semibold mb-4">Healthier Alternatives</h2>
        
        {isAlternativesLoading ? (
          <div className="animate-pulse">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ) : alternatives && alternatives.length > 0 ? (
          <div className="space-y-3">
            {alternatives.map((alt: any) => (
              <div 
                key={alt.id} 
                className="flex items-center p-3 bg-neutral dark:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => navigate(`/product/${alt.id}`)}
              >
                <div className="bg-white dark:bg-gray-800 w-12 h-12 rounded flex items-center justify-center mr-3">
                  {alt.imageUrl && (
                    <img 
                      src={alt.imageUrl} 
                      alt={alt.name} 
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{alt.name}</div>
                  <div className="flex items-center">
                    <div className="px-1.5 py-0.5 bg-primary bg-opacity-20 text-primary text-xs rounded mr-2">
                      {alt.palmOilContent} mL palm oil
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {alt.calories || "N/A"} kcal
                    </div>
                  </div>
                </div>
                <button className="p-2 text-primary">
                  <i className="far fa-bookmark"></i>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No alternatives found for this product
          </div>
        )}
      </div>
      
      {/* Log Consumption Button */}
      <div className="fixed bottom-16 inset-x-0 p-4">
        <Button 
          className="w-full"
          onClick={() => setIsLogModalOpen(true)}
        >
          Log Consumption
        </Button>
      </div>

      {/* Log Consumption Modal */}
      <LogConsumptionModal 
        isOpen={isLogModalOpen} 
        onClose={() => setIsLogModalOpen(false)}
        product={product}
      />
    </div>
  );
}

export default ProductDetails;