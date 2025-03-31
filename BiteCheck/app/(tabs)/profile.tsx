import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAppContext } from "@/lib/context/app-context";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: number;
  name: string;
  description: string;
  points: number;
  criteria: string;
}

interface Challenge {
  id: number;
  name: string;
  description: string;
  target: number;
  unit: string;
  userProgress?: number;
  startDate: string;
  endDate: string;
}

interface User {
  id: number;
  username: string;
  name?: string;
  email?: string;
  totalPoints?: number;
  palmOilAvoided?: number;
  avatar?: string;
}

export function Profile() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const { user, setUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: ""
  });

  // Fetch user achievements
  const { data: achievements = [] } = useQuery({
    queryKey: ["/api/users", user?.id, "achievements"],
    queryFn: async () => {
      if (!user?.id) return [];
      return apiRequest<Achievement[]>(`/api/users/${user.id}/achievements`);
    },
    enabled: !!user?.id
  });

  // Fetch user challenges
  const { data: challenges = [] } = useQuery({
    queryKey: ["/api/users", user?.id, "challenges"],
    queryFn: async () => {
      if (!user?.id) return [];
      return apiRequest<Challenge[]>(`/api/users/${user.id}/challenges`);
    },
    enabled: !!user?.id
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async (userData: {name?: string, email?: string}) => {
      if (!user?.id) throw new Error("User not logged in");
      return apiRequest<User>(`/api/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify(userData)
      });
    },
    onSuccess: (data) => {
      setUser(data);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
      queryClient.invalidateQueries({ queryKey: ["/api/users", user?.id] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    if (user) {
      setEditedUser({
        name: user.name || "",
        email: user.email || ""
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>Please log in to view your profile.</p>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Go to Login
        </Button>
      </div>
    );
  }

  const handleUpdate = () => {
    updateUserMutation.mutate(editedUser);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <Card className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name?.charAt(0) || user.username?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{user.name || user.username}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleUpdate} disabled={updateUserMutation.isPending}>
                {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-2">Stats</h2>
        <Card className="p-4 grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Total Points</p>
            <p className="text-2xl font-bold">{user.totalPoints || 0}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Palm Oil Avoided</p>
            <p className="text-2xl font-bold">
              {user.palmOilAvoided ? `${user.palmOilAvoided}g` : "0g"}
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Achievements</h2>
        {achievements.length === 0 ? (
          <Card className="p-4">
            <p className="text-center text-muted-foreground">No achievements yet</p>
          </Card>
        ) : (
          <Card className="p-4">
            <div className="space-y-2">
              {achievements.map((achievement: Achievement) => (
                <div key={achievement.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 text-xl">🏆</div>
                    <div>
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                  <Badge>{achievement.points} pts</Badge>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Active Challenges</h2>
        {challenges.length === 0 ? (
          <Card className="p-4">
            <p className="text-center text-muted-foreground">No active challenges</p>
          </Card>
        ) : (
          <Card className="p-4">
            <div className="space-y-4">
              {challenges.map((challenge: Challenge) => (
                <div key={challenge.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{challenge.name}</p>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                    <Badge>
                      {challenge.userProgress || 0}/{challenge.target} {challenge.unit}
                    </Badge>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full mt-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          ((challenge.userProgress || 0) / challenge.target) * 100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <div className="py-4">
        <Button variant="outline" className="w-full" onClick={() => {
          setUser(null);
          navigate("/");
        }}>
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default Profile;