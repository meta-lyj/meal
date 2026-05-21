import React, { useState, useEffect, useMemo } from "react";
import { MealData, Dish } from "../types";
import { formatDateKey, getTodayKST } from "../utils";
import AppHeader from "./AppHeader";

interface CalculatorScreenProps {
  meals: MealData[];
}

export default function CalculatorScreen({ meals }: CalculatorScreenProps) {
  const todayKST = getTodayKST();
  const todayDay = todayKST.getDay();
  const isWeekend = todayDay === 0 || todayDay === 6;

  // 주말이면 가장 가까운 미래 월요일 식단으로 디폴트 설정
  const calculationDate = isWeekend
    ? (() => {
        const nextMon = new Date(todayKST);
        const diff = todayDay === 0 ? 1 : 2;
        nextMon.setDate(todayKST.getDate() + diff);
        return nextMon;
      })()
    : todayKST;

  const targetDateKey = formatDateKey(calculationDate);

  // 오늘 날짜의 중식 메뉴 데이터
  const todayLunch = useMemo(() => {
    return meals.find(m => m.dateKey === targetDateKey && m.mealType === "중식");
  }, [meals, targetDateKey]);

  // 체크리스트용 아이템 상태 선언
  const [dishesState, setDishesState] = useState<Dish[]>([]);
  const [checkedNames, setCheckedNames] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<"전체" | "밥류" | "국/찌개" | "반찬" | "디저트">("전체");

  // 저장하기 메시지 노출용
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 오늘 날짜의 메뉴를 기본 식단 요리 목록으로 세팅
  useEffect(() => {
    if (todayLunch) {
      setDishesState(todayLunch.dishes);
      // 기본적으로 처음에는 모든 요리가 선택되어 있는 상태로 지정
      setCheckedNames(todayLunch.dishes.map(d => d.name));
    } else {
      setDishesState([]);
      setCheckedNames([]);
    }
  }, [todayLunch]);

  // 체크 박스 토글 기능
  const handleToggle = (dishName: string) => {
    setCheckedNames(prev => {
      if (prev.includes(dishName)) {
        return prev.filter(name => name !== dishName);
      } else {
        return [...prev, dishName];
      }
    });
  };

  // 계산된 영양소 총합
  const totals = useMemo(() => {
    let kcal = 0;
    let protein = 0;
    let carbohydrates = 0;
    let fat = 0;

    dishesState.forEach(dish => {
      if (checkedNames.includes(dish.name)) {
        kcal += dish.kcal;
        protein += dish.protein;
        carbohydrates += dish.carbohydrates;
        fat += dish.fat;
      }
    });

    return { kcal, protein, carbohydrates, fat };
  }, [dishesState, checkedNames]);

  // 필터링 처리
  const filteredDishes = useMemo(() => {
    if (activeFilter === "전체") return dishesState;
    return dishesState.filter(d => d.category === activeFilter);
  }, [dishesState, activeFilter]);

  // 권장섭취량 한계치 상수 정의
  const targets = {
    protein: 65,
    carbohydrates: 300,
    fat: 70
  };

  const handleSave = () => {
    setToastMessage("계산 결과가 성공적으로 저장되었습니다! 📝");
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8faf4] text-[#191c19] pb-36">
      <AppHeader title="영양 계산기" />

      <main className="mt-[56px] px-5 pt-6 flex flex-col gap-6">

        {/* NutritionSummaryCard */}
        <section className="bg-white rounded-lg p-6 shadow-[0_4px_12px_rgba(42,36,26,0.05)] border border-[#e1e3dd]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-[#3c5500] rounded-full"></div>
              <h2 className="font-headline-sm text-[16px] md:text-[18px] font-bold text-[#191c19]">오늘의 선택 영양</h2>
            </div>
            <div className="text-right shrink-0">
              <span className="font-headline-lg text-[22px] md:text-[24px] font-bold text-[#3c5500]" id="total-kcal">
                {totals.kcal}
              </span>
              <span className="font-bold text-[12px] text-[#444939] ml-1">kcal</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Protein */}
            <div>
              <div className="flex justify-between text-[12px] font-bold mb-1">
                <span className="text-[#444939]">단백질</span>
                <span className="text-[#3c5500] font-bold">{totals.protein}g / {targets.protein}g</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#3c5500] transition-all duration-500" 
                  style={{ width: `${Math.min(100, (totals.protein / targets.protein) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Carbs */}
            <div>
              <div className="flex justify-between text-[12px] font-bold mb-1">
                <span className="text-[#444939]">탄수화물</span>
                <span className="text-[#536500] font-bold">{totals.carbohydrates}g / {targets.carbohydrates}g</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#536500] transition-all duration-500" 
                  style={{ width: `${Math.min(100, (totals.carbohydrates / targets.carbohydrates) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Fats */}
            <div>
              <div className="flex justify-between text-[12px] font-bold mb-1">
                <span className="text-[#444939]">지방</span>
                <span className="text-[#485229] font-bold">{totals.fat}g / {targets.fat}g</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#485229] transition-all duration-500" 
                  style={{ width: `${Math.min(100, (totals.fat / targets.fat) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* MenuFilterChips */}
        <section className="flex gap-2 overflow-x-auto hide-scrollbar -mx-5 px-5 pb-1">
          {(["전체", "밥류", "국/찌개", "반찬", "디저트"] as const).map((filter, index) => {
            const isSelected = activeFilter === filter;
            return (
              <button
                key={index}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-[12px] font-bold flex-shrink-0 transition-transform active:scale-95 cursor-pointer ${
                  isSelected 
                    ? "bg-[#3c5500] text-white" 
                    : "bg-[#e7e9e3] text-[#444939] hover:bg-[#e1e3dd]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </section>

        {/* SelectableMenuItem List */}
        <section className="flex flex-col gap-3">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish, index) => {
              const isChecked = checkedNames.includes(dish.name);
              return (
                <label
                  key={index}
                  onClick={() => handleToggle(dish.name)}
                  className={`flex items-center gap-4 p-4 bg-white rounded-lg border active:scale-[0.98] transition-all cursor-pointer ${
                    isChecked 
                      ? "border-[#3c5500] shadow-[0_2px_8px_rgba(60,85,0,0.04)]" 
                      : "border-gray-100 opacity-60"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // label onClick handles toggle
                    className="w-5 h-5 rounded text-[#3c5500] focus:ring-[#3c5500] border-gray-300 pointer-events-none"
                  />
                  <div className="flex-1">
                    <h3 className="font-body-lg text-[15px] font-bold text-[#191c19]">{dish.name}</h3>
                    <p className="text-[11px] text-[#444939]">
                      {dish.kcal} kcal · 탄 {dish.carbohydrates}g, 단 {dish.protein}g, 지 {dish.fat}g
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[11px] font-bold select-none shrink-0 ${
                    dish.category === "밥류" 
                      ? "bg-[#d2ea7a] text-[#576a00]" 
                      : "bg-[#e1e3dd] text-[#444939]"
                  }`}>
                    {dish.category}
                  </div>
                </label>
              );
            })
          ) : (
            <div className="text-gray-400 text-center py-12 text-[14px]">
              {isWeekend 
                ? "오늘은 등록된 식단이 없습니다. (주말)"
                : "해당 카테고리의 반찬 정보가 없습니다."
              }
            </div>
          )}
        </section>

        {/* Toast Toast alerts */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#3c5500] text-white px-5 py-3 rounded-full text-[13px] font-bold shadow-lg z-50 flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            {toastMessage}
          </div>
        )}

        {/* Save Button Container */}
        <div className="fixed bottom-[88px] left-0 w-full px-5 z-40">
          <button
            onClick={handleSave}
            className="w-full h-[56px] bg-[#3c5500] text-white rounded-lg text-[16px] md:text-[18px] font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 hover:bg-[#4f6f00] duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined">save</span>
            계산 결과 저장하기
          </button>
        </div>

      </main>
    </div>
  );
}
