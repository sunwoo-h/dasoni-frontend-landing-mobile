import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import ImgFooter from "../assets/img-footer.svg";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const target = footerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // 한 번만 동작
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <FooterContainer ref={footerRef}>
        <FadeInItem $visible={isVisible} $delay="0s">
          <img src={ImgFooter} style={{ display: "block", width: "100%" }} />
        </FadeInItem>
      </FooterContainer>
      <FooterContainer2>
        {/* Instagram 부분만 애니메이션 */}
        <FadeInItem $visible={isVisible} $delay="0.1s">
          <Wrapper>
            <FooterLabel>Instagram</FooterLabel>
            <FooterContent>@dasoni.official</FooterContent>
          </Wrapper>
        </FadeInItem>

        {/* Email은 그대로, 애니메이션 X */}
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

// 공통 페이드 인 래퍼
const FadeInItem = styled.div`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "12px")});
  transition: opacity 0.6s ease-out ${({ $delay }) => $delay || "0s"},
    transform 0.6s ease-out ${({ $delay }) => $delay || "0s"};
`;

export default Footer;
