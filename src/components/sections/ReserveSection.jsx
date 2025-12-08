import React, { forwardRef, useState } from "react";
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

  return (
    <SectionContainer
      ref={ref}
      data-tab-id="reserve"
      $bgGradient="linear-gradient(90deg, #FFF1F2 9.13%, #FFF6EB 76.44%, #FFEFE5 100%)"
      style={{ paddingBottom: "25px" }}
    >
      <SectionIconWrapper>
        <ReserveInfo style={{ marginTop: "55px" }}>
          사전예약 후 다소니를 가장 먼저 만나보세요
        </ReserveInfo>
      </SectionIconWrapper>
      <ReserveLabel>사전예약 기한</ReserveLabel>
      <ReserveContent style={{ marginBottom: "15px" }}>
        2025. 12. 10. ~ 25. 12. 20. (목)
      </ReserveContent>
      <ReserveLabel>사전예약 기한</ReserveLabel>
      <ReserveContent style={{ marginBottom: "28px" }}>
        AI 음성 편지 생성, AI 이미지 생성 무료 이용
      </ReserveContent>
      <ReserveGuide>사전 예약 신청을 위해 아래 폼을 입력해주세요</ReserveGuide>
      <ReserveForm>
        <FormRow>
          <FormLabel>성별</FormLabel>
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
        </FormRow>
        <FormRow>
          <FormLabel>생년월일</FormLabel>
          <FormInput placeholder="2000/12/12" />
        </FormRow>
        <FormRow>
          <FormLabel>이메일 주소</FormLabel>
          <FormInput placeholder="예) dasoni@naver.com" />
        </FormRow>
        <ReserveButton type="button">사전 예약 제출하기</ReserveButton>
      </ReserveForm>
    </SectionContainer>
  );
});

const SectionIconReserve = styled.div`
  font-size: 2rem;
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
  border-radius: 18px;
  padding: 18px 16px 20px;
  margin: 0 25px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.06);
  border: 1px solid #f1eeea;
`;

const FormRow = styled.div`
  margin-bottom: 14px;
`;

const FormLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #8d8a86;
  margin-bottom: 8px;
`;

const GenderToggle = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  padding: 4px;
  border-radius: 12px;
  background: #f9f8f7;
  border: 1px solid #e7e2dc;
`;

const GenderButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? "linear-gradient(90deg, #ffb66a 0%, #ff8b6a 100%)" : "transparent"};
  color: ${({ $active }) => ($active ? "#ffffff" : "#c3bcb4")};
  box-shadow: ${({ $active }) =>
    $active ? "0 6px 18px rgba(255, 143, 106, 0.35)" : "none"};
  transition: all 0.15s ease-in-out;
`;

const FormInput = styled.input`
  width: 100%;
  border-radius: 12px;
  border: 1px solid #e8e4df;
  padding: 12px 14px;
  font-size: 14px;
  font-weight: 600;
  outline: none;
  background: #fdfcfb;
  color: #8d8a86;

  &::placeholder {
    color: #cfcac4;
    font-weight: 600;
  }
`;

const ReserveButton = styled.button`
  margin-top: 6px;
  width: 100%;
  border-radius: 12px;
  border: none;
  padding: 14px 1rem;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(90deg, #ffc36f 0%, #ff936f 100%);
  box-shadow: 0 10px 24px rgba(255, 146, 111, 0.35);
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
