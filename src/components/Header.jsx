import React, { useRef, useState, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import ImgFrame from "../assets/img-frame.png";
import ImgLogo from "../assets/img-logo.png";
import ImgHouse from "../assets/img-house.png";
import { InlineReserveButton } from "./FloatingReserveButton";

function Header({ inlineRef, onReserveClick }) {
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);

  // 이미지 세 장 다 로딩된 뒤에 애니메이션 시작
  const handleImgLoad = useCallback(() => {
    loadedCountRef.current += 1;

    // Frame, Logo, House 이미지 총 3개
    if (loadedCountRef.current >= 3 && !isReady) {
      // 살짝 딜레이 주고 시작하면 더 부드럽게 느낌남
      setTimeout(() => {
        setIsReady(true);
      }, 120);
    }
  }, [isReady]);

  return (
    <HeaderContainer>
      <FrameImg src={ImgFrame} onLoad={handleImgLoad} $ready={isReady} />
      <LogoImg src={ImgLogo} onLoad={handleImgLoad} $ready={isReady} />
      <Title $ready={isReady}>
        순우리말로 사랑하는 사람을 뜻하는 다소니는
        <br />
        사랑하는 사람을 추모하는 <b>온라인 추모 공간</b>입니다
      </Title>
      <HouseImg src={ImgHouse} onLoad={handleImgLoad} $ready={isReady} />
      <ButtonWrapper $ready={isReady}>
        <InlineReserveButton ref={inlineRef} onClick={onReserveClick} />
      </ButtonWrapper>
    </HeaderContainer>
  );
}

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const floaty = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
`;

const HeaderContainer = styled.header`
  padding: 60px 0 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: radial-gradient(
      106.34% 80.72% at 49.87% 69.12%,
      #fff 69.31%,
      rgba(255, 230, 199, 0.63) 89.27%
    ),
    #fff;
  justify-content: space-between;
`;

// 공통: 초기 상태는 안 보이게
const baseFadeItem = css`
  opacity: 0;
  transform: translateY(12px);
`;

const FrameImg = styled.img`
  width: 50px;

  margin-bottom: 25px;
  ${baseFadeItem};

  ${({ $ready }) =>
    $ready &&
    css`
      animation: ${fadeUp} 0.55s ease forwards;
      animation-delay: 0.05s;
    `}
`;

const LogoImg = styled.img`
  width: 135px;
  margin-bottom: 15px;
  ${baseFadeItem};

  ${({ $ready }) =>
    $ready &&
    css`
      animation: ${fadeUp} 0.55s ease forwards;
      animation-delay: 0.2s;
    `}
`;

const Title = styled.div`
  color: var(--50, #7a7a7a);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 144%; /* 23.04px */
  margin-bottom: 47px;
  ${baseFadeItem};

  ${({ $ready }) =>
    $ready &&
    css`
      animation: ${fadeUp} 0.55s ease forwards;
      animation-delay: 0.35s;
    `}
`;

const HouseImg = styled.img`
  margin-bottom: 45px;
  width: 275px;
  ${baseFadeItem};

  ${({ $ready }) =>
    $ready &&
    css`
      animation: ${fadeUp} 0.55s ease forwards,
        ${floaty} 2s ease-in-out 0.9s infinite;
      animation-delay: 0.5s, 0.9s;
    `}
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  ${baseFadeItem};

  ${({ $ready }) =>
    $ready &&
    css`
      animation: ${fadeUp} 0.55s ease forwards;
      animation-delay: 0.65s;
    `}
`;

export default Header;
