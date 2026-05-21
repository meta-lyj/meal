import React, { useState } from "react";
import { MealData } from "../types";
import { formatKoreanDate, getTodayKST, getKoreanDayOfWeek } from "../utils";
import AppHeader from "./AppHeader";

interface HomeScreenProps {
  meals: MealData[];
  onNavigate: (tab: "home" | "menu" | "calc" | "profile") => void;
}

export default function HomeScreen({ meals, onNavigate }: HomeScreenProps) {
  const todayKST = getTodayKST();
  const todayDay = todayKST.getDay(); // 0(일) ~ 6(토)
  const isWeekend = todayDay === 0 || todayDay === 6;

  // 주말 처리 (방식 B): 오늘이 주말이면 가장 가까운 월요일 식단을 보여줍니다.
  const displayDate = isWeekend 
    ? (() => {
        const nextMon = new Date(todayKST);
        const diff = todayDay === 0 ? 1 : 2; // 일요일은 1일 뒤, 토요일은 2일 뒤가 월요일
        nextMon.setDate(todayKST.getDate() + diff);
        return nextMon;
      })()
    : todayKST;

  const dateStr = displayDate.toISOString().split("T")[0];
  const dateKey = dateStr.replace(/-/g, "");

  // 해당 일자 급식 필터링
  const todayLunch = meals.find(m => m.dateKey === dateKey && m.mealType === "중식");
  const todayDinner = meals.find(m => m.dateKey === dateKey && m.mealType === "석식");

  // 대표 메뉴 및 이미지 산정하기
  // 주중 템플릿 요일에 따름
  const getMealHeroImage = (dayOfWeek: string) => {
    if (dayOfWeek === "화") {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuBvx9mqWEPAHHs7E4dmqrmcf9bwkVJxris6DZDwA_lLaTlphw5QjdIaVNYJ5Qv-h_vtqvESqQHgzi4VrFjH9mWpJ68nTugwbJZeCoRGdF7YPVE3517YRNnh_k-Mm_KWeVAc4J4vpX0FrO5Vip8zHUMeVnodpBz4RagQO3FSDeljLPrG1prcBzE7_7GU9qGy3E4AQpBZcvNOkGIlTeA2geBZUgp32Ayi56PPg44xbN4mVX8DvTbgDNIFbP6d3dcYHu16BHG85BlOAtQ";
    } else if (dayOfWeek === "수") {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuCRutPcFlFTpRn0h75k9nsOPRtGV6rzMMt3KB-1yUozAAEeRHqK51MkRO6aFfH51gtmohEtxcPlnFSXwp-v1iLjO21NlgT_6imOTcAVT_QdRjb4_7pZv4KUnQPQ-Y6zynTn-G3srK_ucmtjIRHdBjlbKM-d1NlzPbmNtOnkeI6gMqlqHF79YFfh08pxfOiaEFYq5LxsS3kWyvD99qYZF_58l8ifQznZ6NJBNFBa-mRBSmjGqYOHX8NpBjH4ZUc07aODk3KAkHCxVKI";
    } else {
      // 목요일 테마나 월요일/금요일 등 대표
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuDay93RqWbSl72C7OXfa-4uu-xzNZ2nl0Za8ltcq7jciMXEL8fFpAfMKwqBVwCT7ZT_u8MLP1yzQFkeUUdgu6JnytfNyvkqgUc8_pfTCzuvxxw2UN-1eQzHx0ayQ2paAnsLP2c8t0iWt3qclU03s_zWoEI5SUth2chzW1EkPMlV4frTxWJNj4A8ffTTdjV751yc0caHvpUg4-toBpxeWNa0wMtvYx1oyQYnkAWlCzU77waGnVytxxM4cd2Uwi2gA8X52ETBIs0y3Xo";
    }
  };

  const currentDayLabel = todayLunch?.dayOfWeek || "목";
  const heroImgUrl = getMealHeroImage(currentDayLabel);
  const heroTitle = todayLunch?.title || "치즈돈까스 정식";
  const heroKcal = todayLunch?.totalCalories || 845;

  // 좋아요 인터랙션
  const [isFavorited, setIsFavorited] = useState(false);

  // 총 칼로리 계산
  const totalCaloriesSum = (todayLunch?.totalCalories || 0) + (todayDinner?.totalCalories || 0);

  return (
    <div className="min-h-screen bg-[#f8faf4] text-[#191c19] pb-32">
      <AppHeader onRightIconClick={() => onNavigate("profile")} />

      <main className="mt-[56px] px-5 pt-6 space-y-6">
        
        {/* 주말에 표출되는 특별 배지 */}
        {isWeekend && (
          <div className="bg-[#FFE7DD] border border-[#ffdad6] text-[#3e4c00] px-4 py-3 rounded-lg flex items-center gap-3 shadow-sm">
            <span className="material-symbols-outlined text-[#3c5500]">info</span>
            <div>
              <p className="font-bold text-[14px]">다음 주 급식일 미리보기</p>
              <p className="text-[12px] opacity-80">오늘은 주말이라 가장 가까운 다음 급식일 식단을 미리 제공합니다.</p>
            </div>
            <span className="bg-[#3c5500] text-white text-[10px] px-2.5 py-1 rounded-full font-bold shrink-0 ml-auto select-none">
              다음 급식일
            </span>
          </div>
        )}

        {/* HeroMealCard */}
        <section className="relative group">
          <div className="bg-white rounded-lg overflow-hidden shadow-[0_4px_12px_rgba(42,36,26,0.05)] border border-[#e1e3dd]/30">
            <div className="relative h-64 w-full">
              <img
                src={heroImgUrl}
                alt={heroTitle}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-[#FFE7DD] text-[#3e4c00] px-3 py-1 rounded-full font-bold text-[12px] shadow-sm select-none">
                오늘의 추천 급식
              </div>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#ba1a1a] transition-all active:scale-90 hover:bg-white cursor-pointer shadow-sm"
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  favorite
                </span>
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[#444939] text-[14px] opacity-70">
                    {formatKoreanDate(displayDate)}
                  </p>
                  <h2 className="font-headline-lg text-[22px] md:text-[24px] font-bold text-[#3c5500]">
                    {heroTitle}
                  </h2>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[#536500] font-bold text-[18px] md:text-[20px]">{heroKcal}</span>
                  <span className="text-[#444939] text-[12px] font-bold ml-0.5">kcal</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Meals Summary */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-6 bg-[#3c5500] rounded-full"></div>
            <h3 className="font-headline-md text-[18px] md:text-[20px] font-bold">오늘의 급식 요약</h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            
            {/* Lunch Card */}
            {todayLunch ? (
              <div className="bg-white p-5 rounded-lg shadow-[0_4px_12px_rgba(42,36,26,0.05)] border-l-4 border-[#3c5500]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-headline-sm text-[16px] md:text-[18px] font-bold text-[#191c19]">중식</span>
                  <span className="text-[#3c5500] font-bold text-[14px] md:text-[16px]">{todayLunch.totalCalories} kcal</span>
                </div>
                <div className="text-[#444939] text-[14px] leading-relaxed">
                  {todayLunch.dishes.map(d => d.name).join(", ")}
                </div>
                {todayLunch.allergens && todayLunch.allergens.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {todayLunch.allergens.map((alg, index) => (
                      <span key={index} className="bg-[#dde8b2] text-[#414b23] px-3 py-1 rounded-full text-[11px] font-bold">
                        {alg}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg text-center text-gray-400 text-[14px]">
                준비된 중식 메뉴가 없습니다.
              </div>
            )}

            {/* Dinner Card */}
            {todayDinner ? (
              <div className="bg-white p-5 rounded-lg shadow-[0_4px_12px_rgba(42,36,26,0.05)] border-l-4 border-gray-400">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-headline-sm text-[16px] md:text-[18px] font-bold text-[#191c19]">석식</span>
                  <span className="text-gray-500 font-bold text-[14px] md:text-[16px]">{todayDinner.totalCalories} kcal</span>
                </div>
                <div className="text-[#444939] text-[14px] leading-relaxed">
                  {todayDinner.dishes.map(d => d.name).join(", ")}
                </div>
                {todayDinner.allergens && todayDinner.allergens.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {todayDinner.allergens.map((alg, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] font-bold">
                        {alg}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg text-center text-gray-400 text-[14px]">
                준비된 석식 메뉴가 없습니다.
              </div>
            )}

          </div>
        </section>

        {/* Nutrition & Allergy Tips */}
        <div className="bg-[#4f6f00]/10 rounded-lg p-5 flex items-start gap-4">
          <div className="bg-[#3c5500] rounded-full p-2 text-white shrink-0">
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-[16px] font-bold text-[#3c5500] mb-1">알레르기 주의</h4>
            <p className="text-[14px] text-[#444939]">
              오늘 {isWeekend ? "체크된 급식" : "중식"}에는{" "}
              <span className="text-[#3c5500] font-bold">우유, 밀, 대두, 돼지고기</span> 성분이 포함되어 있습니다.
              해당 알레르기가 등록된 학생들은 영양 섭취 전 알람 카드를 확인해 주세요.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
