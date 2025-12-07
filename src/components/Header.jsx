import React from "react";
import styled from "styled-components";
import ImgFrame from "../assets/img-frame.svg";
import ImgLogo from "../assets/img-logo.svg";
import ImgHouse from "../assets/img-house.svg";
import { InlineReserveButton } from "./FloatingReserveButton";

function Header({ inlineRef, onReserveClick }) {
  return (
    <HeaderContainer>
      <img src={ImgFrame} style={{ marginBottom: "25px" }} />
      <img src={ImgLogo} style={{ marginBottom: "15px" }} />
      <Title>
        순우리말로 사랑하는 사람을 뜻하는 다소니는
        <br />
        사랑하는 사람을 추모하는 <b>온라인 추모 공간</b>입니다
      </Title>
      <img src={ImgHouse} style={{ marginBottom: "45px" }} />
      <InlineReserveButton ref={inlineRef} onClick={onReserveClick} />
    </HeaderContainer>
  );
}

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

const Title = styled.div`
  color: var(--50, #7a7a7a);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 144%; /* 23.04px */
  margin-bottom: 47px;
`;

export default Header;
