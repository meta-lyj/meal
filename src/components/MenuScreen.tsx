import React, { useMemo } from "react";
import { MealData } from "../types";
import { getWeekDates, getWeekOfMonth, formatDateKey, getTodayKST, getDayLabel } from "../utils";
import AppHeader from "./AppHeader";

interface MenuScreenProps {
  meals: MealData[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  allergies: string[];
}

export default function MenuScreen({ meals, selectedDate, onSelectDate, allergies }: MenuScreenProps) {
  const todayKST = getTodayKST();
  const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate]);
  const weekTitle = useMemo(() => getWeekOfMonth(selectedDate), [selectedDate]);

  const selectedDateKey = formatDateKey(selectedDate);

  // 현재 선택된 날짜의 중식, 석식 필터링
  const selectedLunch = meals.find(m => m.dateKey === selectedDateKey && m.mealType === "중식");
  const selectedDinner = meals.find(m => m.dateKey === selectedDateKey && m.mealType === "석식");

  // 단백질 달성률 더미 계산 (메뉴 다양성 표시)
  const proteinAchievement = (meal: MealData | undefined) => {
    if (!meal) return 0;
    // 간단히 ID나 날짜 등으로 45% ~ 95% 사이 값 결정
    const hash = meal.dishes.length * 15 + meal.totalCalories % 31;
    return 50 + (hash % 41); // 50% ~ 90%
  };

  const lunchProtein = proteinAchievement(selectedLunch);
  const dinnerProtein = proteinAchievement(selectedDinner);

  return (
    <div className="min-h-screen bg-[#f8faf4] text-[#191c19] pb-32">
      <AppHeader title="학교 식단표" />

      <main className="mt-[56px] px-5 py-6">
        
        {/* Title Section */}
        <section className="mb-6">
          <span className="text-[#3c5500] font-bold text-[12px] tracking-wider uppercase">주간 식단</span>
          <h2 className="font-headline-lg text-[24px] font-bold text-[#191c19] mt-1">
            {weekTitle}
          </h2>
        </section>

        {/* WeekDateSelector */}
        <div className="bg-[#edefe9] rounded-lg p-2 mb-6 flex justify-between items-center shadow-sm overflow-x-auto hide-scrollbar gap-2">
          {weekDates.map((date, idx) => {
            const isSelected = formatDateKey(date) === selectedDateKey;
            const isToday = formatDateKey(date) === formatDateKey(todayKST);
            const label = getDayLabel(date); // "월", "화" etc
            const dayNum = date.getDate();

            return (
              <button
                key={idx}
                onClick={() => onSelectDate(date)}
                className={`flex flex-col items-center justify-center min-w-[56px] flex-1 py-3 rounded-xl transition-all active:scale-95 cursor-pointer relative ${
                  isSelected 
                    ? "bg-[#3c5500] text-white shadow-md font-bold" 
                    : "text-[#444939] hover:bg-[#e1e3dd]/60"
                }`}
              >
                {/* 오늘 표시 도트 */}
                {isToday && (
                  <span className={`absolute top-1.5 w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-[#3c5500]"}`} />
                )}
                <span className={`text-[11px] ${isSelected ? "opacity-90" : "opacity-60"}`}>
                  {label}
                </span>
                <span className="text-[16px] font-bold">
                  {dayNum}
                </span>
              </button>
            );
          })}
        </div>

        {/* Meal Cards */}
        <div className="space-y-6">
          
          {/* Lunch Card */}
          <article className="bg-white rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(42,36,26,0.05)] border border-[#e1e3dd]/30">
            <div className="h-40 w-full relative">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvx9mqWEPAHHs7E4dmqrmcf9bwkVJxris6DZDwA_lLaTlphw5QjdIaVNYJ5Qv-h_vtqvESqQHgzi4VrFjH9mWpJ68nTugwbJZeCoRGdF7YPVE3517YRNnh_k-Mm_KWeVAc4J4vpX0FrO5Vip8zHUMeVnodpBz4RagQO3FSDeljLPrG1prcBzE7_7GU9qGy3E4AQpBZcvNOkGIlTeA2geBZUgp32Ayi56PPg44xbN4mVX8DvTbgDNIFbP6d3dcYHu16BHG85BlOAtQ"
                alt="중식 급식 사진"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#3c5500] text-white px-3 py-1 rounded-full text-[12px] font-bold shadow-sm select-none">
                중식
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-[#3c5500] rounded-full"></div>
                <h3 className="font-headline-sm text-[18px] font-bold text-[#191c19]">오늘의 중식</h3>
              </div>

              {selectedLunch ? (
                <>
                  <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 mb-6">
                    {selectedLunch.dishes.map((dish, idx) => (
                      <li key={idx} className="text-[14px] text-[#191c19] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#536500]"></span>
                        <span className="truncate">{dish.name}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-[#edefe9] p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[12px] text-[#444939] font-bold">단백질 달성률</span>
                      <span className="text-[14px] text-[#3c5500] font-extrabold">{lunchProtein}%</span>
                    </div>
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#3c5500] rounded-full transition-all duration-1000" 
                        style={{ width: `${lunchProtein}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-[#444939] mt-2">
                      {lunchProtein >= 80 ? "오늘의 권장 섭취량에 거의 도달했어요! 👍" : "영양이 풍부한 점심으로 체력을 보충하세요!"}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-center py-6 text-[14px]">등록된 중식 일정이 없습니다.</p>
              )}
            </div>
          </article>

          {/* Dinner Card */}
          <article className="bg-white rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(42,36,26,0.05)] border border-[#e1e3dd]/30">
            <div className="h-40 w-full relative">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRutPcFlFTpRn0h75k9nsOPRtGV6rzMMt3KB-1yUozAAEeRHqK51MkRO6aFfH51gtmohEtxcPlnFSXwp-v1iLjO21NlgT_6imOTcAVT_QdRjb4_7pZv4KUnQPQ-Y6zynTn-G3srK_ucmtjIRHdBjlbKM-d1NlzPbmNtOnkeI6gMqlqHF79YFfh08pxfOiaEFYq5LxsS3kWyvD99qYZF_58l8ifQznZ6NJBNFBa-mRBSmjGqYOHX8NpBjH4ZUc07aODk3KAkHCxVKI"
                alt="석식 대안 사진"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#606a3f] text-[#dfeab3] px-3 py-1 rounded-full text-[12px] font-bold shadow-sm select-none">
                석식
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-[#485229] rounded-full"></div>
                <h3 className="font-headline-sm text-[18px] font-bold text-[#191c19]">오늘의 석식</h3>
              </div>

              {selectedDinner ? (
                <>
                  <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 mb-6">
                    {selectedDinner.dishes.map((dish, idx) => (
                      <li key={idx} className="text-[14px] text-[#191c19] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c1cc98]"></span>
                        <span className="truncate">{dish.name}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-[#edefe9] p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[12px] text-[#444939] font-bold">단백질 달성률</span>
                      <span className="text-[14px] text-[#485229] font-extrabold">{dinnerProtein}%</span>
                    </div>
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#485229] rounded-full transition-all duration-1000" 
                        style={{ width: `${dinnerProtein}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-[#444939] mt-2">
                      저녁 식사로 단백질과 유익 미네랄을 보충하고 가벼운 하루를 마무리하세요!
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-center py-6 text-[14px]">등록된 석식 일정이 없습니다.</p>
              )}
            </div>
          </article>

        </div>

        {/* Allergen Info (Contextual Bento Item) */}
        <section className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-[#c9f17c] p-4 rounded-lg flex flex-col justify-between shadow-sm min-h-[110px]">
            <span className="material-symbols-outlined text-[#141f00] text-[22px]">info</span>
            <div>
              <p className="text-[#141f00] text-[14px] font-bold mt-2">알레르기 정보</p>
              <p className="text-[#141f00]/70 text-[11px] mt-1 truncate">
                나의 설정: {allergies.length > 0 ? allergies.join(", ") : "없음"}
              </p>
            </div>
          </div>
          <div className="bg-[#d2ea7a] p-4 rounded-lg flex flex-col justify-between shadow-sm min-h-[110px]">
            <span className="material-symbols-outlined text-[#171e00] text-[22px]">nutrition</span>
            <div>
              <p className="text-[#171e00] text-[14px] font-bold mt-2">오늘의 영양팁</p>
              <p className="text-[#171e00]/70 text-[11px] mt-1">비타민 C가 풍부한 과일(골드키위 등)을 보충하세요.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
