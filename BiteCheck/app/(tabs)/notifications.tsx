import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "../lib/context/app-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiRequest, queryClient } from "../lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  _id?: string;
  id?: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export function Notifications() {
  const { toast } = useToast();
  const { user } = useAppContext();

  // Fetch user notifications
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["/api/users", user?.id, "notifications"],
    queryFn: async () => {
      if (!user?.id) return [];
      return apiRequest<Notification[]>(`/api/users/${user.id}/notifications`);
    },
    enabled: !!user?.id
  });

  // Mark notification as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      return apiRequest<Notification>(`/api/notifications/${notificationId}/read`, {
        method: "PATCH"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", user?.id, "notifications"] });
    }
  });

  // Clear all notifications mutation
  const clearAllMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error("User not logged in");
      return apiRequest<{success: boolean}>(`/api/users/${user.id}/notifications/clear`, {
        method: "DELETE"
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "All notifications cleared"
      });
      queryClient.invalidateQueries({ queryKey: ["/api/users", user?.id, "notifications"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear notifications",
        variant: "destructive"
      });
    }
  });

  const handleMarkAsRead = (notificationId: string | number | undefined) => {
    if (!notificationId) return;
    markAsReadMutation.mutate(notificationId.toString());
  };

  const handleClearAll = () => {
    clearAllMutation.mutate();
  };

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p>Please log in to view your notifications.</p>
      </div>
    );
  }

  const formatNotificationTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "recently";
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {notifications.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearAll}
            disabled={clearAllMutation.isPending}
          >
            {clearAllMutation.isPending ? "Clearing..." : "Clear All"}
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No notifications</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification: Notification) => (
            <Card 
              key={notification._id || notification.id} 
              className={`p-4 ${notification.read ? 'bg-background' : 'bg-primary-foreground'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{notification.title}</h3>
                    {!notification.read && (
                      <Badge variant="default" className="text-xs">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatNotificationTime(notification.createdAt)}
                  </p>
                </div>
                {!notification.read && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleMarkAsRead(notification._id || notification.id)}
                    disabled={markAsReadMutation.isPending}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;