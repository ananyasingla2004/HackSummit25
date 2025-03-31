import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  palmOilContent: number;
  servingSize?: string;
  servingSizeAmount?: number;
  calories?: number;
}

interface LogConsumptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export function LogConsumptionModal({ isOpen, onClose, product }: LogConsumptionModalProps) {
  const [servings, setServings] = useState(1);
  const { toast } = useToast();
  
  // Calculate palm oil and calories based on servings
  const servingSizeAmount = product.servingSizeAmount || 1;
  const palmOilPerServing = product.palmOilContent / servingSizeAmount;
  const caloriesPerServing = (product.calories || 0) / servingSizeAmount;
  
  const totalPalmOil = Math.round(palmOilPerServing * servings);
  const totalCalories = Math.round(caloriesPerServing * servings);
  
  const logMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/consumption", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users/1/consumption'] });
      toast({
        title: "Consumption logged",
        description: `${servings} servings of ${product.name} recorded successfully`,
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to log consumption. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const handleIncrement = () => {
    setServings(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    if (servings > 1) {
      setServings(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    // In a real app, we would get the userId from auth context
    // For now, using user ID 1 as placeholder
    logMutation.mutate({
      userId: 1,
      productId: product.id,
      servingsConsumed: servings,
      palmOilAmount: totalPalmOil,
      calories: totalCalories,
    });
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-11/12 max-w-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Log Consumption</h3>
          <button 
            className="p-2 text-gray-600 dark:text-gray-300"
            onClick={onClose}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Product</div>
          <div className="font-medium">{product.name}</div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Serving Size: {product.servingSize || '1 serving'}
          </div>
          <div className="flex items-center mt-2">
            <button 
              className="w-10 h-10 rounded-full bg-neutral dark:bg-gray-700 flex items-center justify-center"
              onClick={handleDecrement}
            >
              <i className="fas fa-minus"></i>
            </button>
            <div className="flex-1 text-center text-2xl font-bold mx-4">{servings}</div>
            <button 
              className="w-10 h-10 rounded-full bg-neutral dark:bg-gray-700 flex items-center justify-center"
              onClick={handleIncrement}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        
        <div className="p-3 bg-neutral dark:bg-gray-700 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm">Palm Oil Intake</div>
              <div className={`font-medium ${
                totalPalmOil > 15 ? "text-destructive" : 
                totalPalmOil > 5 ? "text-warning" : "text-primary"
              }`}>
                {totalPalmOil} mL
              </div>
            </div>
            <div>
              <div className="text-sm">Calories</div>
              <div className="font-medium">{totalCalories} kcal</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={logMutation.isPending}
          >
            {logMutation.isPending ? "Logging..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
}