import React from "react";

interface AppHeaderProps {
  onRightIconClick?: () => void;
  rightIcon?: string;
  title?: string;
}

export default function AppHeader({ onRightIconClick, rightIcon = "notifications", title = "씨마스고등학교 급식" }: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-5 h-[56px]">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[#3c5500] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          restaurant
        </span>
        <h1 className="font-headline-sm text-[16px] md:text-[18px] font-bold text-[#3c5500]">
          {title}
        </h1>
      </div>
      <button 
        onClick={onRightIconClick}
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95 duration-200 cursor-pointer"
      >
        <span className="material-symbols-outlined text-gray-600">
          {rightIcon}
        </span>
      </button>
    </header>
  );
}
