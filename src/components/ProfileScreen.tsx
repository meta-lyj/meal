import React, { useState } from "react";
import AppHeader from "./AppHeader";

interface ProfileScreenProps {
  allergies: string[];
  onAddAllergy: (allergy: string) => void;
  onRemoveAllergy: (allergy: string) => void;
  alertAllergy: boolean;
  onToggleAlertAllergy: () => void;
  alertDailyMenu: boolean;
  onToggleAlertDailyMenu: () => void;
}

export default function ProfileScreen({
  allergies,
  onAddAllergy,
  onRemoveAllergy,
  alertAllergy,
  onToggleAlertAllergy,
  alertDailyMenu,
  onToggleAlertDailyMenu,
}: ProfileScreenProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const allergenOptions = ["우유", "땅콩", "대두", "밀", "돼지고기", "쇠고기", "계란", "닭고기", "토마토"];

  return (
    <div className="min-h-screen bg-[#f8faf4] text-[#191c19] pb-32">
      <AppHeader title="마이 프로필" />

      <main className="mt-[56px] px-5 pt-6 space-y-6">
        
        {/* ProfileCard Section */}
        <section className="bg-white rounded-lg p-6 shadow-[0_4px_12px_rgba(42,36,26,0.05)] relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7sZxNxA0ZGvZV0SXF0uDBuRUIKVf7AiD5B417gsMN1Rob9TfVGMCWchE4IXXDO7pupH2Uvdg4y909ghFlmPZPYf-xaUNN8SGck_20lvP_jmZrqYijCS-lBMdKVE_KLHjtio-Bt162e8jz0QJAoMLTnD5AWxshx6gMcUr_2oo9UbEqtp3WIr5E0vxwiRxpC06RkdbjzrZ9rFIPRTadKfAZ1VEZEL0YTb7rKSZgVMZf-C6nF1bpmkAqUOEC8c_OPMk6otOrEd6saV8"
                alt="김학생 프로필 캐릭터"
                className="w-20 h-20 rounded-full border-4 border-[#c9f07c] object-cover"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => alert("프로필 사진 설정 기능은 준비 중입니다.")}
                className="absolute bottom-0 right-0 bg-[#3c5500] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
              </button>
            </div>
            
            <div className="flex-1">
              <h2 className="font-headline-md text-[20px] font-bold text-[#191c19]">김학생</h2>
              <p className="text-[14px] text-[#444939] opacity-70">2학년 3반 15번</p>
              <div className="mt-2 flex gap-1.5">
                <span className="bg-[#4f6f00]/10 text-[#3c5500] text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  재학생
                </span>
                <span className="bg-[#d2ea7a] text-[#576a00] text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  급식우선
                </span>
              </div>
            </div>
          </div>
          
          {/* Decorative Background Element */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#c9f07c]/20 rounded-full blur-3xl"></div>
        </section>

        {/* Notification & Allergy Settings */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-[#3c5500] rounded-full"></div>
            <h3 className="font-headline-sm text-[16px] md:text-[18px] font-bold">알림 및 알레르기 설정</h3>
          </div>

          <div className="bg-white rounded-lg divide-y divide-gray-100 shadow-[0_4px_12px_rgba(42,36,26,0.05)] border border-gray-100/50">
            {/* Allergy Alert */}
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                    <span className="material-symbols-outlined select-none">warning</span>
                  </div>
                  <div>
                    <p className="text-[14px] md:text-[15px] font-bold">알레르기 경고 알림</p>
                    <p className="text-[11px] text-[#444939] opacity-60">식단에 포함 시 실시간 알림 경고</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={alertAllergy} 
                    onChange={onToggleAlertAllergy}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3c5500]"></div>
                </label>
              </div>

              {/* Allergy Tag List */}
              <div className="flex flex-wrap gap-2 pt-1">
                {allergies.map((alg, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full bg-[#dde8b2] text-[#414b23] text-[12px] font-bold gap-1 shadow-sm"
                  >
                    {alg}
                    <button 
                      onClick={() => onRemoveAllergy(alg)}
                      className="ml-0.5 leading-none hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
                
                <button 
                  onClick={() => setShowAddMenu(!showAddMenu)}
                  className="inline-flex items-center px-3 py-1 rounded-full border border-dashed border-gray-400 text-[#444939] text-[12px] hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] mr-1">add</span> 추가
                </button>
              </div>

              {/* Dropdown for adding specific allergies */}
              {showAddMenu && (
                <div className="bg-[#f8faf4] border border-gray-200 rounded-lg p-3 mt-2 grid grid-cols-3 gap-2">
                  {allergenOptions.map((opt, idx) => {
                    const isAlreadyAdded = allergies.includes(opt);
                    return (
                      <button
                        key={idx}
                        disabled={isAlreadyAdded}
                        onClick={() => {
                          onAddAllergy(opt);
                          setShowAddMenu(false);
                        }}
                        className={`px-2.5 py-1.5 rounded text-[11px] font-bold text-center transition-all cursor-pointer ${
                          isAlreadyAdded
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-[#3c5500] border border-[#3c5500]/20 hover:bg-[#3c5500] hover:text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Daily Menu Alert */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#c9f17c]/40 flex items-center justify-center text-[#3c5500]">
                  <span className="material-symbols-outlined select-none">notifications_active</span>
                </div>
                <div>
                  <p className="text-[14px] md:text-[15px] font-bold">일일 식단 알림</p>
                  <p className="text-[11px] text-[#444939] opacity-60">매일 아침 8시 메뉴 알람 발송</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={alertDailyMenu}
                  onChange={onToggleAlertDailyMenu}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3c5500]"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Support Links */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-5 bg-[#536500] rounded-full"></div>
            <h3 className="font-headline-sm text-[16px] font-bold">고객지원 및 정보</h3>
          </div>
          
          <div className="bg-white rounded-lg shadow-[0_4px_12px_rgba(42,36,26,0.05)] border border-gray-100/50 overflow-hidden divide-y divide-gray-100">
            <button 
              onClick={() => alert("고객센터 준비 과정에 있습니다.")}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-500">support_agent</span>
                <span className="text-[14px]">고객센터</span>
              </div>
              <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </button>
            <button 
              onClick={() => alert("이용약관 및 정보고시 사항입니다.")}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-500">description</span>
                <span className="text-[14px]">이용약관</span>
              </div>
              <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </button>
            <button 
              onClick={() => alert("로그아웃 되었습니다.")}
              className="w-full flex items-center p-4 hover:bg-red-50 transition-all cursor-pointer text-left text-red-600 font-bold"
            >
              <span className="material-symbols-outlined mr-3">logout</span>
              <span className="text-[14px]">로그아웃</span>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center">
          <p className="text-[11px] text-gray-400">© 2026 씨마스고등학교 급식. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
