import React, { useState, useMemo } from "react";
import HomeScreen from "./components/HomeScreen";
import MenuScreen from "./components/MenuScreen";
import CalculatorScreen from "./components/CalculatorScreen";
import ProfileScreen from "./components/ProfileScreen";
import { generateWeeklyMeals } from "./data";
import { getTodayKST, getDefaultSelectedDate } from "./utils";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "menu" | "calc" | "profile">("home");
  
  // 한국 표준시 KST 기준의 오늘 날짜 취득
  const todayKST = useMemo(() => getTodayKST(), []);
  
  // 기본 선택 일자 (평일은 오늘, 주말은 차주 월요일)
  const [selectedDate, setSelectedDate] = useState<Date>(() => getDefaultSelectedDate(todayKST));

  // 사용자 맞춤 알레르기 및 알림 상태 데이터
  const [allergies, setAllergies] = useState<string[]>(["우유", "땅콩"]);
  const [alertAllergy, setAlertAllergy] = useState<boolean>(true);
  const [alertDailyMenu, setAlertDailyMenu] = useState<boolean>(true);

  // 날짜 기준으로 주간 급식 데이터 동적 생성
  // selectedDate가 가리키는 주의 월요일~금요일까지 완벽 세팅
  const weeklyMeals = useMemo(() => {
    return generateWeeklyMeals(selectedDate);
  }, [selectedDate]);

  // 알레르기 추가 핸들러
  const handleAddAllergy = (allergy: string) => {
    setAllergies(prev => {
      if (prev.includes(allergy)) return prev;
      return [...prev, allergy];
    });
  };

  // 알레르기 삭제 핸들러
  const handleRemoveAllergy = (allergy: string) => {
    setAllergies(prev => prev.filter(a => a !== allergy));
  };

  // 탭 네비게이션 랜더링 분기
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen meals={weeklyMeals} onNavigate={setActiveTab} />;
      case "menu":
        return (
          <MenuScreen 
            meals={weeklyMeals} 
            selectedDate={selectedDate} 
            onSelectDate={setSelectedDate} 
            allergies={allergies}
          />
        );
      case "calc":
        return <CalculatorScreen meals={weeklyMeals} />;
      case "profile":
        return (
          <ProfileScreen 
            allergies={allergies}
            onAddAllergy={handleAddAllergy}
            onRemoveAllergy={handleRemoveAllergy}
            alertAllergy={alertAllergy}
            onToggleAlertAllergy={() => setAlertAllergy(!alertAllergy)}
            alertDailyMenu={alertDailyMenu}
            onToggleAlertDailyMenu={() => setAlertDailyMenu(!alertDailyMenu)}
          />
        );
      default:
        return <HomeScreen meals={weeklyMeals} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf4] font-headline-sm flex flex-col justify-between">
      
      {/* 액티브 탭 컨텐츠 */}
      <div className="flex-1">
        {renderContent()}
      </div>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-100 flex justify-around items-center h-[72px] px-4 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] pb-safe rounded-t-xl select-none">
        
        {/* Home */}
        <button 
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-xl transition-all active:scale-90 cursor-pointer ${
            activeTab === "home" 
              ? "bg-[#3c5500] text-white shadow-sm font-bold" 
              : "text-[#444939] opacity-60 hover:bg-gray-50"
          }`}
        >
          <span 
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeTab === "home" ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className="text-[12px] font-bold mt-0.5">홈</span>
        </button>

        {/* Menu */}
        <button 
          onClick={() => setActiveTab("menu")}
          className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-xl transition-all active:scale-90 cursor-pointer ${
            activeTab === "menu" 
              ? "bg-[#3c5500] text-white shadow-sm font-bold" 
              : "text-[#444939] opacity-60 hover:bg-gray-50"
          }`}
        >
          <span 
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeTab === "menu" ? "'FILL' 1" : "'FILL' 0" }}
          >
            calendar_month
          </span>
          <span className="text-[12px] font-bold mt-0.5">식단표</span>
        </button>

        {/* Calculator */}
        <button 
          onClick={() => setActiveTab("calc")}
          className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-xl transition-all active:scale-90 cursor-pointer ${
            activeTab === "calc" 
              ? "bg-[#3c5500] text-white shadow-sm font-bold" 
              : "text-[#444939] opacity-60 hover:bg-gray-50"
          }`}
        >
          <span 
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeTab === "calc" ? "'FILL' 1" : "'FILL' 0" }}
          >
            calculate
          </span>
          <span className="text-[12px] font-bold mt-0.5">영양계산</span>
        </button>

        {/* Profile */}
        <button 
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-xl transition-all active:scale-90 cursor-pointer ${
            activeTab === "profile" 
              ? "bg-[#3c5500] text-white shadow-sm font-bold" 
              : "text-[#444939] opacity-60 hover:bg-gray-50"
          }`}
        >
          <span 
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: activeTab === "profile" ? "'FILL' 1" : "'FILL' 0" }}
          >
            person
          </span>
          <span className="text-[12px] font-bold mt-0.5">프로필</span>
        </button>

      </nav>
    </div>
  );
}
