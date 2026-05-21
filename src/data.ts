import { MealData } from "./types";
import { getWeekDates, formatDateKey, getDayLabel } from "./utils";

/**
 * 주어진 기준 날짜 주간(월~금)의 5일치 급식 Mock 데이터(중식, 석식 총 10개 레코드)를 동적으로 생성합니다.
 */
export function generateWeeklyMeals(referenceDate: Date): MealData[] {
  const weekDates = getWeekDates(referenceDate);
  const meals: MealData[] = [];

  // 월요일부터 금요일까지의 메뉴 템플릿
  const templates = [
    // 1. 월요일 (Template 0)
    {
      dayLabel: "월" as const,
      lunch: {
        title: "마파두부 덮밥 정식",
        dishes: [
          { name: "마파두부 덮밥", category: "밥류" as const, kcal: 450, protein: 15, carbohydrates: 80, fat: 8 },
          { name: "팽이버섯 된장국", category: "국/찌개" as const, kcal: 80, protein: 3, carbohydrates: 10, fat: 2 },
          { name: "꿔바로우 탕수육", category: "반찬" as const, kcal: 220, protein: 10, carbohydrates: 25, fat: 9 },
          { name: "단무지 무침", category: "반찬" as const, kcal: 30, protein: 1, carbohydrates: 5, fat: 0 },
          { name: "포기김치", category: "반찬" as const, kcal: 15, protein: 1, carbohydrates: 3, fat: 0 },
          { name: "요구르트", category: "디저트" as const, kcal: 15, protein: 0, carbohydrates: 3, fat: 0 }
        ],
        allergens: ["대두", "밀", "돼지고기"]
      },
      dinner: {
        title: "치즈 라면 & 삼각김밥",
        dishes: [
          { name: "참치마요 삼각김밥", category: "밥류" as const, kcal: 180, protein: 4, carbohydrates: 32, fat: 4 },
          { name: "치즈 라면", category: "국/찌개" as const, kcal: 480, protein: 12, carbohydrates: 65, fat: 18 },
          { name: "미니 만두 튀김", category: "반찬" as const, kcal: 120, protein: 3, carbohydrates: 15, fat: 5 },
          { name: "배추김치", category: "반찬" as const, kcal: 15, protein: 1, carbohydrates: 3, fat: 0 },
          { name: "단무지", category: "반찬" as const, kcal: 15, protein: 0, carbohydrates: 2, fat: 0 }
        ],
        allergens: ["우유", "대두", "밀", "계란", "돼지고기"]
      }
    },
    // 2. 화요일 (Template 1)
    {
      dayLabel: "화" as const,
      lunch: {
        title: "안동찜닭 한상",
        dishes: [
          { name: "잡곡밥", category: "밥류" as const, kcal: 300, protein: 6, carbohydrates: 65, fat: 1 },
          { name: "얼큰쇠고기무국", category: "국/찌개" as const, kcal: 120, protein: 12, carbohydrates: 10, fat: 5 },
          { name: "안동찜닭", category: "반찬" as const, kcal: 310, protein: 22, carbohydrates: 20, fat: 15 },
          { name: "숙주나물무침", category: "반찬" as const, kcal: 45, protein: 2, carbohydrates: 4, fat: 2 },
          { name: "배추김치", category: "반찬" as const, kcal: 20, protein: 1, carbohydrates: 3, fat: 0 },
          { name: "골드키위", category: "디저트" as const, kcal: 50, protein: 1, carbohydrates: 12, fat: 0 }
        ],
        allergens: ["대두", "밀", "닭고기", "쇠고기"]
      },
      dinner: {
        title: "수제돈가스 & 강황밥",
        dishes: [
          { name: "강황밥", category: "밥류" as const, kcal: 290, protein: 5, carbohydrates: 62, fat: 1 },
          { name: "맑은미역국", category: "국/찌개" as const, kcal: 80, protein: 4, carbohydrates: 6, fat: 3 },
          { name: "수제돈가스", category: "반찬" as const, kcal: 260, protein: 16, carbohydrates: 22, fat: 11 },
          { name: "양배추샐러드", category: "반찬" as const, kcal: 45, protein: 1, carbohydrates: 7, fat: 1 },
          { name: "깍두기", category: "반찬" as const, kcal: 15, protein: 1, carbohydrates: 3, fat: 0 },
          { name: "사과푸딩", category: "디저트" as const, kcal: 30, protein: 0, carbohydrates: 7, fat: 0 }
        ],
        allergens: ["대두", "밀", "돼지고기", "우유"]
      }
    },
    // 3. 수요일 (Template 2)
    {
      dayLabel: "수" as const,
      lunch: {
        title: "매콤돈육강정 한판",
        dishes: [
          { name: "귀리현미밥", category: "밥류" as const, kcal: 320, protein: 6, carbohydrates: 72, fat: 1 },
          { name: "얼큰소고기무국", category: "국/찌개" as const, kcal: 145, protein: 12, carbohydrates: 8, fat: 7 },
          { name: "매콤돈육강정", category: "반찬" as const, kcal: 380, protein: 14, carbohydrates: 30, fat: 17 },
          { name: "수제 요거트 푸딩", category: "디저트" as const, kcal: 120, protein: 4, carbohydrates: 18, fat: 3 }
        ],
        allergens: ["밀", "돼지고기", "쇠고기", "우유"]
      },
      dinner: {
        title: "수제오므라이스 정식",
        dishes: [
          { name: "수제오므라이스", category: "밥류" as const, kcal: 480, protein: 12, carbohydrates: 75, fat: 14 },
          { name: "가쓰오 미니우동", category: "국/찌개" as const, kcal: 160, protein: 5, carbohydrates: 28, fat: 2 },
          { name: "수제소시지구이", category: "반찬" as const, kcal: 80, protein: 6, carbohydrates: 2, fat: 5 },
          { name: "포기김치", category: "반찬" as const, kcal: 15, protein: 1, carbohydrates: 3, fat: 0 },
          { name: "방울토마토", category: "디저트" as const, kcal: 15, protein: 0, carbohydrates: 3, fat: 0 }
        ],
        allergens: ["계란", "대두", "밀", "토마토"]
      }
    },
    // 4. 목요일 (Template 3)
    {
      dayLabel: "목" as const,
      lunch: {
        title: "치즈돈까스 정식",
        dishes: [
          { name: "치즈돈까스 & 데미글라스 소스", category: "반찬" as const, kcal: 390, protein: 22, carbohydrates: 34, fat: 20 },
          { name: "쌀밥", category: "밥류" as const, kcal: 290, protein: 5, carbohydrates: 64, fat: 1 },
          { name: "미소된장국", category: "국/찌개" as const, kcal: 85, protein: 3, carbohydrates: 8, fat: 3 },
          { name: "양배추샐러드", category: "반찬" as const, kcal: 45, protein: 1, carbohydrates: 7, fat: 1 },
          { name: "포기김치", category: "반찬" as const, kcal: 15, protein: 1, carbohydrates: 3, fat: 0 },
          { name: "요구르트", category: "디저트" as const, kcal: 20, protein: 0, carbohydrates: 4, fat: 0 }
        ],
        allergens: ["우유", "대두", "밀", "돼지고기"]
      },
      dinner: {
        title: "불고기 덮밥 정식",
        dishes: [
          { name: "불고기 덮밥", category: "밥류" as const, kcal: 460, protein: 18, carbohydrates: 72, fat: 12 },
          { name: "콩나물국", category: "국/찌개" as const, kcal: 60, protein: 4, carbohydrates: 5, fat: 2 },
          { name: "계란말이", category: "반찬" as const, kcal: 120, protein: 8, carbohydrates: 2, fat: 9 },
          { name: "오이무침", category: "반찬" as const, kcal: 45, protein: 1, carbohydrates: 4, fat: 1 },
          { name: "깍두기", category: "반찬" as const, kcal: 15, protein: 1, carbohydrates: 3, fat: 0 },
          { name: "사과주스", category: "디저트" as const, kcal: 20, protein: 0, carbohydrates: 4, fat: 0 }
        ],
        allergens: ["쇠고기", "계란", "대두", "밀"]
      }
    },
    // 5. 금요일 (Template 4)
    {
      dayLabel: "금" as const,
      lunch: {
        title: "약고추장 비빔밥 & 떡갈비구이",
        dishes: [
          { name: "약고추장 비빔밥", category: "밥류" as const, kcal: 440, protein: 10, carbohydrates: 82, fat: 8 },
          { name: "아욱국", category: "국/찌개" as const, kcal: 70, protein: 3, carbohydrates: 8, fat: 2 },
          { name: "수제 떡갈비구이", category: "반찬" as const, kcal: 220, protein: 12, carbohydrates: 15, fat: 12 },
          { name: "배추김치", category: "반찬" as const, kcal: 15, protein: 1, carbohydrates: 3, fat: 0 },
          { name: "요구르트 푸딩", category: "디저트" as const, kcal: 85, protein: 2, carbohydrates: 12, fat: 3 }
        ],
        allergens: ["밀", "돼지고기", "대두", "쇠고기", "우유"]
      },
      dinner: {
        title: "스팸마요 덮밥 & 떡볶이",
        dishes: [
          { name: "스팸마요 덮밥", category: "밥류" as const, kcal: 410, protein: 9, carbohydrates: 58, fat: 15 },
          { name: "매콤 국물 떡볶이", category: "반찬" as const, kcal: 210, protein: 5, carbohydrates: 42, fat: 3 },
          { name: "어묵탕", category: "국/찌개" as const, kcal: 90, protein: 5, carbohydrates: 6, fat: 4 },
          { name: "깍두기", category: "반찬" as const, kcal: 15, protein: 0, carbohydrates: 2, fat: 0 },
          { name: "과일 주스", category: "디저트" as const, kcal: 15, protein: 0, carbohydrates: 3, fat: 0 }
        ],
        allergens: ["대두", "밀", "돼지고기", "계란"]
      }
    }
  ];

  // 각 월~금요일 Date 정보를 돌며 템플릿 정보를 결합
  weekDates.forEach((date, index) => {
    const template = templates[index];
    const dateKey = formatDateKey(date);
    const dayOfWeekStr = getDayLabel(date); // "월" | "화" | "수" | "목" | "금"

    // 중식 가공 기입
    let totalLunchKcal = 0;
    const lunchNutrition = { kcal: 0, protein: 0, carbohydrates: 0, fat: 0 };
    template.lunch.dishes.forEach(d => {
      totalLunchKcal += d.kcal;
      lunchNutrition.kcal += d.kcal;
      lunchNutrition.protein += d.protein;
      lunchNutrition.carbohydrates += d.carbohydrates;
      lunchNutrition.fat += d.fat;
    });

    meals.push({
      id: `${dateKey}_lunch`,
      schoolName: "씨마스고등학교",
      date,
      dateKey,
      dayOfWeek: dayOfWeekStr,
      mealType: "중식",
      title: template.lunch.title,
      dishes: template.lunch.dishes,
      totalCalories: totalLunchKcal,
      nutrition: lunchNutrition,
      allergens: template.lunch.allergens
    });

    // 석식 가공 기입
    let totalDinnerKcal = 0;
    const dinnerNutrition = { kcal: 0, protein: 0, carbohydrates: 0, fat: 0 };
    template.dinner.dishes.forEach(d => {
      totalDinnerKcal += d.kcal;
      dinnerNutrition.kcal += d.kcal;
      dinnerNutrition.protein += d.protein;
      dinnerNutrition.carbohydrates += d.carbohydrates;
      dinnerNutrition.fat += d.fat;
    });

    meals.push({
      id: `${dateKey}_dinner`,
      schoolName: "씨마스고등학교",
      date,
      dateKey,
      dayOfWeek: dayOfWeekStr,
      mealType: "석식",
      title: template.dinner.title,
      dishes: template.dinner.dishes,
      totalCalories: totalDinnerKcal,
      nutrition: dinnerNutrition,
      allergens: template.dinner.allergens
    });
  });

  return meals;
}
