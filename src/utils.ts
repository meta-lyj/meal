import { MealData } from "./types";

/**
 * 한국 시간(KST, Asia/Seoul) 기준의 오늘 날짜를 반환합니다.
 * 브라우저 환경에서 타임존 차이로 일자 계산이 흐트러지지 않도록 합니다.
 */
export function getTodayKST(): Date {
  const now = new Date();
  
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    
    const parts = formatter.formatToParts(now);
    const year = parseInt(parts.find(p => p.type === "year")!.value, 10);
    const month = parseInt(parts.find(p => p.type === "month")!.value, 10) - 1;
    const day = parseInt(parts.find(p => p.type === "day")!.value, 10);
    
    // 타임존 변화나 날짜 자정 전후 계산 왜곡을 막기 위해 12시 정오로 생성
    return new Date(year, month, day, 12, 0, 0, 0);
  } catch (e) {
    // 대체용 안전 코드
    const kstOffset = 9 * 60; // KST는 UTC+9
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kstDate = new Date(utc + (kstOffset * 60000));
    kstDate.setHours(12, 0, 0, 0);
    return kstDate;
  }
}

/**
 * "일요일", "월요일" 등으로 요일 구하기
 */
export function getKoreanDayOfWeek(date: Date): string {
  const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  return days[date.getDay()];
}

/**
 * "5월 15일 금요일" 과 같이 한국식 날짜 텍스트로 변환합니다.
 */
export function formatKoreanDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = getKoreanDayOfWeek(date);
  return `${month}월 ${day}일 ${dayName}`;
}

/**
 * NEIS API 연동 등 데이터 Key용 "YYYYMMDD" 문자열 변환
 */
export function formatDateKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

/**
 * 입력된 날짜가 속한 주의 월요일부터 금요일까지 5일치 Date 배열을 구합니다.
 */
export function getWeekDates(date: Date): Date[] {
  const currentDay = date.getDay(); // 0(일) ~ 6(토)
  
  // 월요일을 한 주의 시작으로 조정
  // 일요일(0)이면 월요일은 6일 전, 월요일(1)이면 0일 전, 금요일(5)이면 4일 전
  const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  
  const monday = new Date(date);
  monday.setDate(date.getDate() + distanceToMonday);
  
  const weekDates: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    d.setHours(12, 0, 0, 0);
    weekDates.push(d);
  }
  return weekDates;
}

/**
 * 해당 날짜를 기준으로 "M월 N주차" 문자열을 반환합니다.
 */
export function getWeekOfMonth(date: Date): string {
  // 이번 주 일정이 포함된 중심 기준(보통 수요일 또는 금일)
  const weekDates = getWeekDates(date);
  const midWeek = weekDates[2]; // 수요일
  const month = midWeek.getMonth() + 1;
  
  // 해당 월 1일의 요일 구하기
  const firstDayOfMonth = new Date(midWeek.getFullYear(), midWeek.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay(); // 월=1 ~ 일=7
  
  const day = midWeek.getDate();
  const weekNo = Math.ceil((day + firstDayOfWeek - 1) / 7);
  
  return `${month}월 ${weekNo}주차`;
}

/**
 * 오늘 요일에 따른 기본 선택 날짜 구하기
 * 평일이면 오늘, 주말(토/일)이면 다음주 월요일을 디폴트로 처리
 */
export function getDefaultSelectedDate(today: Date): Date {
  const day = today.getDay();
  if (day === 0) { // 일요일 -> 다음 월요일
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + 1);
    return nextMonday;
  } else if (day === 6) { // 토요일 -> 다음 월요일
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + 2);
    return nextMonday;
  }
  return today;
}

/**
 * 요일 한글 약자 반환 (월, 화, 수 etc)
 */
export function getDayLabel(date: Date): "월" | "화" | "수" | "목" | "금" | "토" | "일" {
  const labels: ("월" | "화" | "수" | "목" | "금" | "토" | "일")[] = ["일", "월", "화", "수", "목", "금", "토"];
  return labels[date.getDay()];
}
