import React, { forwardRef, useState, useEffect } from "react";
import {
  SectionContainer,
  SectionIconWrapper,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from "./SectionBase";
import styled from "styled-components";

const ReserveSection = forwardRef((_, ref) => {
  const [gender, setGender] = useState("male");
  const [isVisible, setIsVisible] = useState(false);

  // ✅ 생년월일 상태 & DatePicker 모달 상태
  const [birthDate, setBirthDate] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // 섹션 진입 시 애니메이션 트리거
  useEffect(() => {
    if (!ref || !("current" in ref)) return;
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // 한 번만
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [ref]);

  // 날짜 포맷터 (YYYY/MM/DD)
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, "0");
    const d = `${date.getDate()}`.padStart(2, "0");
    return `${y}/${m}/${d}`;
  };

  const handleSelectDate = (date) => {
    setBirthDate(formatDate(date));
  };

  return (
    <>
      <SectionContainer
        ref={ref}
        data-tab-id="reserve"
        $bgGradient="linear-gradient(90deg, #FFF1F2 9.13%, #FFF6EB 76.44%, #FFEFE5 100%)"
        style={{ paddingBottom: "25px" }}
      >
        <SectionIconWrapper>
          <FadeInItem $visible={isVisible} $delay="0s">
            <ReserveInfo style={{ marginTop: "55px", marginBottom: "27px" }}>
              사전예약 후 다소니를 가장 먼저 만나보세요
            </ReserveInfo>
          </FadeInItem>
        </SectionIconWrapper>

        <FadeInItem $visible={isVisible} $delay="0.1s">
          <ReserveLabel>사전예약 기한</ReserveLabel>
        </FadeInItem>
        <FadeInItem $visible={isVisible} $delay="0.15s">
          <ReserveContent style={{ marginBottom: "15px" }}>
            2025. 12. 10. ~ 25. 12. 20. (목)
          </ReserveContent>
        </FadeInItem>

        <FadeInItem $visible={isVisible} $delay="0.25s">
          <ReserveLabel>사전예약 혜택</ReserveLabel>
        </FadeInItem>
        <FadeInItem $visible={isVisible} $delay="0.3s">
          <ReserveContent style={{ marginBottom: "28px" }}>
            AI 음성 편지 생성, AI 이미지 생성 무료 이용
          </ReserveContent>
        </FadeInItem>

        <FadeInItem $visible={isVisible} $delay="0.4s">
          <ReserveGuide>
            사전 예약 신청을 위해 아래 폼을 입력해주세요
          </ReserveGuide>
        </FadeInItem>

        <FadeInItem $visible={isVisible} $delay="0.5s">
          <ReserveForm>
            <FormRow>
              <FormColumn>
                <FormLabel>성별</FormLabel>
                <FormLabel>생년월일</FormLabel>
                <FormLabel>이메일 주소</FormLabel>
              </FormColumn>

              <FormColumn>
                <GenderToggle>
                  <GenderButton
                    type="button"
                    $active={gender === "male"}
                    onClick={() => setGender("male")}
                  >
                    남자
                  </GenderButton>
                  <GenderButton
                    type="button"
                    $active={gender === "female"}
                    onClick={() => setGender("female")}
                  >
                    여자
                  </GenderButton>
                </GenderToggle>

                {/* ✅ 생년월일 입력 + DatePicker 트리거 (디자인 유지) */}
                <FormInput
                  placeholder="2000/12/12"
                  value={birthDate}
                  readOnly
                  onClick={() => setIsDatePickerOpen(true)}
                />

                <FormInput placeholder="예) dasoni@naver.com" />
              </FormColumn>
            </FormRow>
            <ReserveButton type="button">사전 예약 제출하기</ReserveButton>
          </ReserveForm>
        </FadeInItem>
      </SectionContainer>

      {/* ✅ DatePicker 모달 */}
      {isDatePickerOpen && (
        <DatePickerModal
          selectedDate={birthDate}
          onChange={handleSelectDate}
          onClose={() => setIsDatePickerOpen(false)}
        />
      )}
    </>
  );
});

const SectionIconReserve = styled.div`
  font-size: 2rem;
`;

// ✅ 페이드 인 공통 래퍼
const FadeInItem = styled.div`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "20px")});
  transition: opacity 0.6s ease-out ${({ $delay }) => $delay || "0s"},
    transform 0.6s ease-out ${({ $delay }) => $delay || "0s"};
`;

const ReserveInfo = styled.div`
  background: linear-gradient(90deg, #ffaab0 9%, #ffc379 76%, #ff9f63 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 26px */
`;

const ReserveLabel = styled.div`
  color: var(--30, #acacac);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 18.2px */
`;

const ReserveContent = styled.div`
  color: var(--50, #7a7a7a);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 18.2px */
`;

const ReserveGuide = styled.div`
  color: var(--10, #ddd);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 18.2px */
  margin-bottom: 15px;
`;

const ReserveForm = styled.div`
  background: #ffffff;
  border-radius: 13px;
  padding: 30px 30px 35px 30px;
  margin: 0 25px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.06);
  border: 1px solid #f1eeea;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const FormColumn = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  justify-content: space-around;
`;

const FormLabel = styled.div`
  color: var(--30, #acacac);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 20.8px */
  white-space: nowrap;
`;

const GenderToggle = styled.div`
  display: grid;
  width: 120px;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 8px;
  background: #f9f8f7;
  border: 1px solid var(--10, #ddd);
`;

const GenderButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#FFBC67" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#ACACAC")};
  transition: all 0.15s ease-in-out;
`;

const FormInput = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--main, #ffbc67);
  padding: 12px 14px;
  outline: none;
  background: #fdfcfb;

  color: #4a4a4a;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 20.8px */

  &::placeholder {
    color: var(--10, #ddd);
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%; /* 20.8px */
  }
`;

const ReserveButton = styled.div`
  display: flex;
  width: 100%;
  height: 54px;
  padding: 13px 0;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 12px;
  background: linear-gradient(
    90deg,
    #ffaab0 9.13%,
    #ffc379 76.44%,
    #ff9f63 100%
  );
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04);
  outline: none;

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 145%; /* 23.2px */
  cursor: pointer;
`;

/* ===========================
   ✅ DatePicker Modal 컴포넌트
   =========================== */

const DatePickerModal = ({ selectedDate, onChange, onClose }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const minYear = 1930; // 필요하면 범위 조정해서 사용 (예: 1950 등)

  // 초기 연/월 설정 (선택된 생일이 있으면 그걸로, 없으면 오늘 기준)
  let initialYear = today.getFullYear();
  let initialMonth = today.getMonth();

  if (selectedDate) {
    const [y, m, d] = selectedDate.split("/");
    if (y && m && d) {
      initialYear = Number(y);
      initialMonth = Number(m) - 1;
    }
  }

  const [viewYear, setViewYear] = useState(initialYear);
  const [viewMonth, setViewMonth] = useState(initialMonth); // 0~11

  // 해당 연/월의 날짜 정보 계산
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0:일요일

  const weeks = [];
  let currentDay = 1 - firstDay; // 첫 주 시작 index

  while (currentDay <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (currentDay < 1 || currentDay > daysInMonth) {
        week.push(null);
      } else {
        week.push(currentDay);
      }
      currentDay++;
    }
    weeks.push(week);
  }

  // 선택된 날짜 파싱
  const parsedSelected = (() => {
    if (!selectedDate) return null;
    const [y, m, d] = selectedDate.split("/");
    if (!y || !m || !d) return null;
    return {
      year: Number(y),
      month: Number(m) - 1,
      day: Number(d),
    };
  })();

  const isSelectedDay = (day) => {
    if (!parsedSelected || !day) return false;
    return (
      parsedSelected.year === viewYear &&
      parsedSelected.month === viewMonth &&
      parsedSelected.day === day
    );
  };

  const handleSelectDateInternal = (day) => {
    if (!day) return;
    const date = new Date(viewYear, viewMonth, day);
    onChange(date);
    onClose();
  };

  // 연도 옵션 (현재년도 ~ minYear까지 역순)
  const yearOptions = [];
  for (let y = currentYear; y >= minYear; y--) {
    yearOptions.push(y);
  }

  return (
    <DatePickerOverlay onClick={onClose}>
      <DatePickerBox onClick={(e) => e.stopPropagation()}>
        <DatePickerHeader>
          <YearMonthSelectWrapper>
            <YearSelect
              value={viewYear}
              onChange={(e) => setViewYear(Number(e.target.value))}
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}년
                </option>
              ))}
            </YearSelect>
            <MonthSelect
              value={viewMonth}
              onChange={(e) => setViewMonth(Number(e.target.value))}
            >
              {Array.from({ length: 12 }).map((_, idx) => (
                <option key={idx} value={idx}>
                  {String(idx + 1).padStart(2, "0")}월
                </option>
              ))}
            </MonthSelect>
          </YearMonthSelectWrapper>

          <CloseHeaderButton type="button" onClick={onClose}>
            닫기
          </CloseHeaderButton>
        </DatePickerHeader>

        <WeekdayRow>
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <Weekday key={day}>{day}</Weekday>
          ))}
        </WeekdayRow>

        <DaysGrid>
          {weeks.map((week, idx) => (
            <WeekRow key={idx}>
              {week.map((day, i) => {
                const selected = isSelectedDay(day);
                return (
                  <DayCell
                    key={`${idx}-${i}`}
                    $isEmpty={!day}
                    $selected={selected}
                    type="button"
                    onClick={() => handleSelectDateInternal(day)}
                    disabled={!day}
                  >
                    {day || ""}
                  </DayCell>
                );
              })}
            </WeekRow>
          ))}
        </DaysGrid>
      </DatePickerBox>
    </DatePickerOverlay>
  );
};

ReserveSection.displayName = "ReserveSection";

export default ReserveSection;

/* ===========================
     ✅ DatePicker styled-components
     =========================== */

const DatePickerOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const DatePickerBox = styled.div`
  width: 100%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 20px 20px 0 0;
  padding: 20px 24px 24px;
  box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.08);
  font-family: Pretendard;
`;

const DatePickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

/* 연/월 셀렉트 래퍼 */
const YearMonthSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

/* 기본 select 스타일 */
const BaseSelect = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  border-radius: 999px;
  border: 1px solid #ffbc67;
  background: #fff7f0;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: #4a4a4a;
  font-family: Pretendard;
  outline: none;

  background-image: linear-gradient(45deg, transparent 50%, #ff9f63 50%),
    linear-gradient(135deg, #ff9f63 50%, transparent 50%);
  background-position: calc(100% - 16px) 50%, calc(100% - 10px) 50%;
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
`;

const YearSelect = styled(BaseSelect)`
  min-width: 104px;
`;

const MonthSelect = styled(BaseSelect)`
  min-width: 80px;
`;

/* 헤더 우측 닫기 버튼 (심플 텍스트) */
const CloseHeaderButton = styled.button`
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: #acacac;
  cursor: pointer;
`;

const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 6px;
`;

const Weekday = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #acacac;
`;

const DaysGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 4px;
`;

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DayCell = styled.button`
  height: 34px;
  border-radius: 999px;
  border: none;
  cursor: ${({ $isEmpty }) => ($isEmpty ? "default" : "pointer")};
  background: ${({ $selected, $isEmpty }) =>
    $isEmpty ? "transparent" : $selected ? "#FFBC67" : "#FFF7F0"};
  color: ${({ $selected, $isEmpty }) =>
    $isEmpty ? "transparent" : $selected ? "#FFFFFF" : "#4A4A4A"};
  font-size: 13px;
  font-weight: 500;
`;
