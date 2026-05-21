export interface NutritionInfo {
  kcal: number;
  protein: number;       // in grams, e.g., 32
  carbohydrates: number; // in grams, e.g., 110
  fat: number;           // in grams, e.g., 25
}

export interface Dish {
  name: string;
  category: "밥류" | "국/찌개" | "반찬" | "디저트";
  kcal: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}

export interface MealData {
  id: string;
  schoolName: "씨마스고등학교";
  date: Date;             // Date object for day
  dateKey: string;        // "YYYYMMDD" format
  dayOfWeek: "월" | "화" | "수" | "목" | "금" | "토" | "일";
  mealType: "중식" | "석식";
  title: string;          // e.g. "치즈돈까스 정식" or "불고기 덮밥"
  dishes: Dish[];         // Detailed dishes
  totalCalories: number;  // Accumulated or direct calorie count
  nutrition: NutritionInfo;
  allergens: string[];    // e.g. ["우유", "대두"]
}

export interface UserProfile {
  name: string;
  info: string;
  allergies: string[];
  alertAllergy: boolean;
  alertDailyMenu: boolean;
}
