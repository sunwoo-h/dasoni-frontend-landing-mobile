import React, { forwardRef } from "react";
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
  return (
    <SectionContainer
      ref={ref}
      data-tab-id="myHall"
      $bgGradient="linear-gradient(180deg, #E7D0F6 0%, #FFF 33.18%)"
    >
      <SectionIconWrapper>
        <img
          src={ImgBlueHouse}
          style={{ marginTop: "35px", marginBottom: "6px" }}
        />
        <SectionLabel style={{ color: "#BD7EE4" }}>나의 추모관</SectionLabel>
      </SectionIconWrapper>
      <SectionTitle>
        훗날, 남겨질 소중한 사람에게 전하고 싶은 진심이 있나요?
      </SectionTitle>
      <SectionSubtitle>
        나의 추모관을 개설해 보세요
        <br />
        기억하고 싶은 내 삶의 순간들을 기록하고
        <br />
        사랑하는 사람들에게 하고 싶은 말을 편지로 남길 수 있어요
      </SectionSubtitle>
      <img src={ImgMyHall} style={{ width: "100%" }} />
    </SectionContainer>
  );
});

MyHallSection.displayName = "MyHallSection";

export default MyHallSection;
