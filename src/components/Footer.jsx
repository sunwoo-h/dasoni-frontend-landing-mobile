import React from "react";
import styled from "styled-components";

import ImgFooter from "../assets/img-footer.svg";

function Footer() {
  return (
    <>
      <FooterContainer>
        <img src={ImgFooter} />
      </FooterContainer>
      <FooterContainer2>
        <Wrapper>
          <FooterLabel>Instagram</FooterLabel>
          <FooterContent>@dasoni.official</FooterContent>
        </Wrapper>
        <Wrapper>
          <FooterLabel>Email</FooterLabel>
          <FooterContent>dasonimemory@gmail.com</FooterContent>
        </Wrapper>
      </FooterContainer2>
    </>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  height: 321px;
  padding: 110px 74px;
  flex-direction: column;
  background: #fff;
  justify-content: center;
`;

const FooterContainer2 = styled.div`
  display: flex;
  background: #fff;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  padding-bottom: 37px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const FooterLabel = styled.div`
  color: var(--10, #ddd);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 16.9px */
`;

const FooterContent = styled.div`
  color: var(--10, #ddd);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: 130%; /* 16.9px */
`;

export default Footer;
