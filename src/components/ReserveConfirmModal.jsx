// src/components/ReserveConfirmModal.jsx
import React from "react";
import styled, { keyframes } from "styled-components";

export default function ReserveConfirmModal({ onClose }) {
  return (
    <ConfirmOverlay onClick={onClose}>
      <ConfirmBox onClick={(e) => e.stopPropagation()}>
        <ConfirmText>
          안녕하세요,
          <br />
          <b> 온라인 추모 서비스 다소니입니다.</b>
          <br />
          <br />
          <b>먼저, 다소니의 사전 예약 신청을 해주셔서 감사합니다.</b>
          <br />
          다소니는 공유 앨범, AI 음성 편지, AI 이미지 생성을 통해
          <br />
          사용자의 애도 과정을 돕는 온라인 추모공간입니다.
          <br />
          <br />
          현재 정식 출시 이전 단계이지만,
          <br />
          <b>
            사전 예약 신청을 해주신 분들께 먼저 보여드리면서
            <br />
            베타 테스트를 진행하려 합니다.
          </b>
          <br />
          <br />
          신청해주셔서 감사드리며, 앞으로 잘 부탁드립니다 😊
        </ConfirmText>

        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ConfirmBox>
    </ConfirmOverlay>
  );
}

/* ======================
      Styled Components
   ====================== */

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const ConfirmOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmBox = styled.div`
  max-width: 350px;
  height: 350px;
  padding: 20px;
  border-radius: 14px;
  background: #fff;

  display: flex;
  flex-direction: column;
  gap: 16px;

  /* ✨ 부드러운 등장 애니메이션 */
  animation: ${fadeInUp} 0.25s ease-out;
`;

const ConfirmText = styled.div`
  color: var(--50, #7a7a7a);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 142%; /* 21.3px */
`;

const ConfirmButton = styled.div`
  display: flex;
  height: 52px;
  padding: 13px 30px;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  color: var(--70, #313131);
  text-align: center;
  /* Heading3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 145%; /* 29px */

  border-radius: 8px;
  border: 1px solid var(--5, #e9e9e9);
  background: var(--main, #ffbc67);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04);
  cursor: pointer;
`;
