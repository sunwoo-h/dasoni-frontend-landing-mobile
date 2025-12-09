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

  return (
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

              <FormInput placeholder="2000/12/12" />
              <FormInput placeholder="예) dasoni@naver.com" />
            </FormColumn>
          </FormRow>
          <ReserveButton type="button">사전 예약 제출하기</ReserveButton>
        </ReserveForm>
      </FadeInItem>
    </SectionContainer>
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

const ReserveNotice = styled.p`
  margin-top: 0.7rem;
  font-size: 0.75rem;
  color: #b19b86;
  text-align: center;
  line-height: 1.5;
`;

ReserveSection.displayName = "ReserveSection";

export default ReserveSection;
