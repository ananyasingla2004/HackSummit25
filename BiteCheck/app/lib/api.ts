import { apiRequest } from "./queryClient";

export const api = {
  // User APIs
  registerUser: async (userData: any) => {
    const res = await apiRequest("POST", "/api/auth/register", userData);
    return res.json();
  },
  
  loginUser: async (credentials: { username: string, password: string }) => {
    const res = await apiRequest("POST", "/api/auth/login", credentials);
    return res.json();
  },
  
  getUser: async (userId: number) => {
    const res = await apiRequest("GET", `/api/users/${userId}`, undefined);
    return res.json();
  },
  
  updateUser: async (userId: number, userData: any) => {
    const res = await apiRequest("PATCH", `/api/users/${userId}`, userData);
    return res.json();
  },
  
  // Product APIs
  getProducts: async () => {
    const res = await apiRequest("GET", "/api/products", undefined);
    return res.json();
  },
  
  getProduct: async (productId: number) => {
    const res = await apiRequest("GET", `/api/products/${productId}`, undefined);
    return res.json();
  },
  
  getProductByBarcode: async (barcode: string) => {
    const res = await apiRequest("GET", `/api/products/barcode/${barcode}`, undefined);
    return res.json();
  },
  
  searchProducts: async (query: string) => {
    const res = await apiRequest("GET", `/api/products/search?q=${encodeURIComponent(query)}`, undefined);
    return res.json();
  },
  
  // Alternatives APIs
  getAlternatives: async (productId: number) => {
    const res = await apiRequest("GET", `/api/products/${productId}/alternatives`, undefined);
    return res.json();
  },
  
  // Consumption APIs
  getConsumptionLogs: async (userId: number) => {
    const res = await apiRequest("GET", `/api/users/${userId}/consumption`, undefined);
    return res.json();
  },
  
  getConsumptionByDateRange: async (userId: number, startDate: Date, endDate: Date) => {
    const start = startDate.toISOString();
    const end = endDate.toISOString();
    const res = await apiRequest("GET", `/api/users/${userId}/consumption/range?start=${start}&end=${end}`, undefined);
    return res.json();
  },
  
  getTotalConsumption: async (userId: number, startDate: Date, endDate: Date) => {
    const start = startDate.toISOString();
    const end = endDate.toISOString();
    const res = await apiRequest("GET", `/api/users/${userId}/consumption/total?start=${start}&end=${end}`, undefined);
    return res.json();
  },
  
  logConsumption: async (logData: any) => {
    const res = await apiRequest("POST", "/api/consumption", logData);
    return res.json();
  },
  
  // Achievement APIs
  getAchievements: async () => {
    const res = await apiRequest("GET", "/api/achievements", undefined);
    return res.json();
  },
  
  getUserAchievements: async (userId: number) => {
    const res = await apiRequest("GET", `/api/users/${userId}/achievements`, undefined);
    return res.json();
  },
  
  awardAchievement: async (userId: number, achievementId: number) => {
    const res = await apiRequest("POST", `/api/users/${userId}/achievements/${achievementId}`, undefined);
    return res.json();
  },
  
  // Challenge APIs
  getChallenges: async () => {
    const res = await apiRequest("GET", "/api/challenges", undefined);
    return res.json();
  },
  
  getUserChallenges: async (userId: number) => {
    const res = await apiRequest("GET", `/api/users/${userId}/challenges`, undefined);
    return res.json();
  },
  
  joinChallenge: async (userId: number, challengeId: number) => {
    const res = await apiRequest("POST", `/api/users/${userId}/challenges/${challengeId}`, undefined);
    return res.json();
  },
  
  updateChallengeProgress: async (userId: number, challengeId: number, progress: number) => {
    const res = await apiRequest("PATCH", `/api/users/${userId}/challenges/${challengeId}`, { progress });
    return res.json();
  },
  
  // Leaderboard APIs
  getLeaderboard: async (timeframe: 'weekly' | 'monthly' | 'allTime' = 'weekly', limit = 10) => {
    const res = await apiRequest("GET", `/api/leaderboard?timeframe=${timeframe}&limit=${limit}`, undefined);
    return res.json();
  },
  
  getUserRank: async (userId: number, timeframe: 'weekly' | 'monthly' | 'allTime' = 'weekly') => {
    const res = await apiRequest("GET", `/api/users/${userId}/rank?timeframe=${timeframe}`, undefined);
    return res.json();
  }
};