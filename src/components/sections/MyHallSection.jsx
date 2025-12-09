// src/features/Landing/components/MyHallSection.jsx
import React, { forwardRef, useEffect, useState } from "react";
import {
  Avatar,
  CardBody,
  CardDate,
  CardHeader,
  CardImage,
  CardName,
  CardScrollWrapper,
  CardText,
  MyHallCard,
  SectionContainer,
  SectionIconWrapper,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from "./SectionBase";
import styled from "styled-components";
import ImgBlueHouse from "../../assets/img-blue-house.svg";
import ImgMyHall from "../../assets/img-my-hall.svg";

const MyHallSection = forwardRef((_, ref) => {
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
  }, [ref]);

  return (
    <SectionContainer
      ref={ref}
      data-tab-id="myHall"
      $bgGradient="linear-gradient(180deg, #E7D0F6 0%, #FFF 33.18%)"
    >
      <FadeInItem $visible={isVisible} $delay="0s">
        <SectionIconWrapper>
          <img
            src={ImgBlueHouse}
            style={{ marginTop: "35px", marginBottom: "6px" }}
            alt="my hall icon"
          />
          <SectionLabel style={{ color: "#BD7EE4" }}>나의 추모관</SectionLabel>
        </SectionIconWrapper>
      </FadeInItem>

      <FadeInItem $visible={isVisible} $delay="0.1s">
        <SectionTitle>
          훗날, 남겨질 소중한 사람에게 전하고 싶은 진심이 있나요?
        </SectionTitle>
      </FadeInItem>

      <FadeInItem $visible={isVisible} $delay="0.2s">
        <SectionSubtitle>
          나의 추모관을 개설해 보세요
          <br />
          기억하고 싶은 내 삶의 순간들을 기록하고
          <br />
          사랑하는 사람들에게 하고 싶은 말을 편지로 남길 수 있어요
        </SectionSubtitle>
      </FadeInItem>

      <FadeInItem $visible={isVisible} $delay="0.3s">
        <img
          src={ImgMyHall}
          style={{ width: "100%", display: "block" }}
          alt="my hall mockup"
        />
      </FadeInItem>
    </SectionContainer>
  );
});

MyHallSection.displayName = "MyHallSection";

export default MyHallSection;

/* ---------- styled-components ---------- */

const FadeInItem = styled.div`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "20px")});
  transition: opacity 0.6s ease-out ${({ $delay }) => $delay || "0s"},
    transform 0.6s ease-out ${({ $delay }) => $delay || "0s"};
`;
