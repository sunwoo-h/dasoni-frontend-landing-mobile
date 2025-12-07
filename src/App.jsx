// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Pretendard", system-ui, sans-serif;
    background: #fff7f0;
    color: #333;
  }

  button {
    font-family: inherit;
  }
`;

export default function App() {
  const [activeTab, setActiveTab] = useState("memorial"); // memorial | letters | myHall | reserve
  const [hideFloating, setHideFloating] = useState(false);

  const memorialRef = useRef(null);
  const lettersRef = useRef(null);
  const myHallRef = useRef(null);
  const reserveRef = useRef(null);

  const sectionRefs = {
    memorial: memorialRef,
    letters: lettersRef,
    myHall: myHallRef,
    reserve: reserveRef,
  };

  // 탭 클릭 시 해당 섹션으로 스크롤
  const handleTabClick = (key) => {
    const targetRef = sectionRefs[key];
    if (!targetRef || !targetRef.current) return;

    const headerOffset = 72; // sticky 탭바 높이만큼 보정
    const rect = targetRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;

    window.scrollTo({
      top: rect.top + scrollTop - headerOffset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const options = {
      threshold: [0.25, 0.5, 0.75],
      rootMargin: "-72px 0px 0px 0px", // 탭바 만큼 위에서 여유
    };

    const observer = new IntersectionObserver((entries) => {
      let mostVisibleSection = null;
      let maxRatio = 0;

      entries.forEach((entry) => {
        const tabId = entry.target.getAttribute("data-tab-id");

        if (tabId === "reserve") {
          // 사전 예약 섹션이 화면에 보이면 플로팅 버튼 숨김
          if (entry.isIntersecting) {
            setHideFloating(true);
          } else {
            setHideFloating(false);
          }
        }

        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleSection = tabId;
        }
      });

      if (mostVisibleSection) {
        setActiveTab(mostVisibleSection);
      }
    }, options);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        {/* 상단 헤더 */}
        <Header>
          <LogoArea>
            <LogoHouse>🏠</LogoHouse>
            <LogoText>
              <LogoTitle>다소니</LogoTitle>
              <LogoSub>추억을 머무르게 하는 작은 추모관</LogoSub>
            </LogoText>
          </LogoArea>
          <HeaderCTA>새로 추모관 만들기</HeaderCTA>
        </Header>

        {/* 탭바 */}
        <TabBar>
          <TabList>
            <TabItem
              type="button"
              $active={activeTab === "memorial"}
              onClick={() => handleTabClick("memorial")}
            >
              추모관
            </TabItem>
            <TabItem
              type="button"
              $active={activeTab === "letters"}
              onClick={() => handleTabClick("letters")}
            >
              편지함
            </TabItem>
            <TabItem
              type="button"
              $active={activeTab === "myHall"}
              onClick={() => handleTabClick("myHall")}
            >
              나의 추모관
            </TabItem>
            <TabItem
              type="button"
              $active={activeTab === "reserve"}
              onClick={() => handleTabClick("reserve")}
            >
              사전 예약
            </TabItem>
          </TabList>
        </TabBar>

        {/* HERO 영역 */}
        <HeroSection>
          <HeroIllustration>
            <Rainbow>🌈</Rainbow>
            <HeroHouse>🏡</HeroHouse>
          </HeroIllustration>
          <HeroTitle>
            사랑하는 사람을 위한
            <br />
            작은 온라인 추모관
          </HeroTitle>
          <HeroDescription>
            사진과 편지, 목소리까지 모아
            <br />
            언제든 꺼내볼 수 있는 공간을 준비했어요.
          </HeroDescription>
        </HeroSection>

        {/* 1. 추모관 섹션 */}
        <Section
          ref={memorialRef}
          data-tab-id="memorial"
          $bgGradient="linear-gradient(180deg, #ffe9ce 0%, #ffe0d8 100%)"
        >
          <SectionIconWrapper>
            <SectionIconHouse>🏠</SectionIconHouse>
            <SectionLabel>추모관</SectionLabel>
          </SectionIconWrapper>
          <SectionTitle>고인과 함께한 사진을 담아둘 수 있어요</SectionTitle>
          <SectionSubtitle>
            가족, 지인과 함께 추모관을 방문하고
            <br />
            사진과 추억을 나눌 수 있어요.
          </SectionSubtitle>

          <CardScrollWrapper>
            <PhotoCard>
              <CardHeader>
                <Avatar />
                <CardName>박철형</CardName>
              </CardHeader>
              <CardImage />
              <CardBody>
                <CardDate>2008년 겨울</CardDate>
                <CardText>
                  솜사탕 하나를 사주니 세상을 다 가진 듯 웃던 네 얼굴. 작은
                  손으로 솜사탕을 쥐고 아빠를 보며 웃던 모습이 아직도 눈에
                  선하구나.
                </CardText>
              </CardBody>
            </PhotoCard>

            <PhotoCard $dimmed>
              <CardHeader>
                <Avatar />
                <CardName>이수정</CardName>
              </CardHeader>
              <CardImage $blue />
              <CardBody>
                <CardDate>2015년 여름</CardDate>
                <CardText>
                  우리 가족의 바다가 된 날. 파도소리에 묻힌 웃음소리가 아직도
                  귓가에 머물러 있어요.
                </CardText>
              </CardBody>
            </PhotoCard>
          </CardScrollWrapper>
        </Section>

        {/* 2. 편지함 섹션 */}
        <Section
          ref={lettersRef}
          data-tab-id="letters"
          $bgGradient="linear-gradient(180deg, #ffe5df 0%, #ffeaf3 100%)"
        >
          <SectionIconWrapper>
            <SectionIconLetter>💌</SectionIconLetter>
            <SectionLabel>편지함</SectionLabel>
          </SectionIconWrapper>
          <SectionTitle>말하지 못했던 마음을 편지로 남겨보세요</SectionTitle>
          <SectionSubtitle>
            힘들었던 날, 고마웠던 순간들을
            <br />
            조용히 꺼내어 적어둘 수 있어요.
          </SectionSubtitle>

          <LetterPreviewWrapper>
            <LetterPaper>
              <LetterHeader>To. 사랑하는 아버지께</LetterHeader>
              <LetterBody>
                오늘도 아버지가 좋아하시던 길을 따라 걸었습니다. 함께 보았던
                벚꽃은 벌써 지고 없지만, 그날의 따뜻한 손길과 웃음은 그대로 남아
                있는 것 같아요. 바쁘다는 이유로 미뤄두었던 말들, 이제라도 천천히
                적어 내려가 보려 합니다...
              </LetterBody>
              <LetterFooter>– 막내딸 수진이</LetterFooter>
            </LetterPaper>
          </LetterPreviewWrapper>
        </Section>

        {/* 3. 나의 추모관 섹션 */}
        <Section
          ref={myHallRef}
          data-tab-id="myHall"
          $bgGradient="linear-gradient(180deg, #ffeaf3 0%, #f9e6ff 100%)"
        >
          <SectionIconWrapper>
            <SectionIconMyHall>🏡</SectionIconMyHall>
            <SectionLabel>나의 추모관</SectionLabel>
          </SectionIconWrapper>
          <SectionTitle>언제든 다시 찾을 수 있도록 모아둘게요</SectionTitle>
          <SectionSubtitle>
            추모관마다 사진과 편지, 음성을
            <br />한 번에 확인하고 관리할 수 있어요.
          </SectionSubtitle>

          <CardScrollWrapper>
            <MyHallCard>
              <CardHeader>
                <Avatar />
                <CardName>엄마와의 마지막 봄날</CardName>
              </CardHeader>
              <CardImage $spring />
              <CardBody>
                <CardDate>2019년 4월 12일</CardDate>
                <CardText>
                  벚꽃이 흩날리던 날, 엄마가 내 손을 꼭 잡고 웃어주던 그 순간을
                  잊지 않을게요.
                </CardText>
              </CardBody>
            </MyHallCard>
          </CardScrollWrapper>
        </Section>

        {/* 4. 사전 예약 섹션 */}
        <Section
          ref={reserveRef}
          data-tab-id="reserve"
          $bgGradient="linear-gradient(180deg, #ffe9ce 0%, #ffeaf3 100%)"
        >
          <SectionIconWrapper>
            <SectionIconReserve>📅</SectionIconReserve>
            <SectionLabel>사전 예약</SectionLabel>
          </SectionIconWrapper>
          <SectionTitle>
            다소니 추모관, 가장 먼저 만나보고 싶으신가요?
          </SectionTitle>
          <SectionSubtitle>
            정식 오픈 전에 알림을 신청하시면
            <br />
            사전 이용 안내와 초대장을 보내드릴게요.
          </SectionSubtitle>

          <ReserveForm>
            <FormRow>
              <FormLabel>이름</FormLabel>
              <FormInput placeholder="이름을 입력해주세요" />
            </FormRow>
            <FormRow>
              <FormLabel>이메일</FormLabel>
              <FormInput placeholder="알림을 받으실 이메일" />
            </FormRow>
            <FormRow>
              <FormLabel>예상 이용 시기</FormLabel>
              <SelectRow>
                <FormSelect>
                  <option>2026년</option>
                  <option>2025년</option>
                  <option>2024년</option>
                </FormSelect>
                <FormSelect>
                  <option>상반기</option>
                  <option>하반기</option>
                </FormSelect>
              </SelectRow>
            </FormRow>
            <ReserveButton type="button">사전 예약 신청하기</ReserveButton>
            <ReserveNotice>
              정확한 오픈 일정과 서비스 소식은
              <br />
              사전 예약을 신청해주신 분들께 가장 먼저 알려드릴게요.
            </ReserveNotice>
          </ReserveForm>
        </Section>

        <Footer>
          <FooterLogo>다소니</FooterLogo>
          <FooterText>사랑하는 마음이 머무는 작은 공간</FooterText>
        </Footer>

        {/* 플로팅 사전 예약 버튼 */}
        {!hideFloating && (
          <FloatingButton
            type="button"
            onClick={() => handleTabClick("reserve")}
          >
            사전 예약하기
          </FloatingButton>
        )}
      </PageWrapper>
    </>
  );
}

/* ===================== styled-components ===================== */

const PageWrapper = styled.div`
  max-width: 430px;
  margin: 0 auto;
  background: #fff7f0;
  padding-bottom: 120px; /* 플로팅 버튼 공간 */
`;

const Header = styled.header`
  padding: 1.25rem 1.25rem 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoHouse = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #ffe0b2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: #ff8a3d;
`;

const LogoSub = styled.div`
  font-size: 0.7rem;
  color: #9f8b78;
`;

const HeaderCTA = styled.button`
  border: none;
  border-radius: 999px;
  padding: 0.55rem 1rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(90deg, #ffb86c, #ff7a7a);
  box-shadow: 0 4px 12px rgba(255, 138, 61, 0.45);
`;

/* 탭바 */

const TabBar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 247, 240, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #ffe0c2;
`;

const TabList = styled.div`
  display: flex;
  padding: 0 0.75rem;
`;

const TabItem = styled.button`
  flex: 1;
  padding: 0.7rem 0.25rem;
  border: none;
  background: transparent;
  font-size: 0.82rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: ${({ $active }) => ($active ? "#ff8a3d" : "#b19b86")};
  border-bottom: 3px solid
    ${({ $active }) => ($active ? "#ff8a3d" : "transparent")};
`;

/* HERO */

const HeroSection = styled.section`
  padding: 1.5rem 1.5rem 1.75rem;
  text-align: center;
`;

const HeroIllustration = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Rainbow = styled.div`
  font-size: 2.1rem;
`;

const HeroHouse = styled.div`
  font-size: 2.2rem;
`;

const HeroTitle = styled.h1`
  font-size: 1.35rem;
  line-height: 1.4;
  font-weight: 700;
  color: #4b3a30;
  margin-bottom: 0.6rem;
`;

const HeroDescription = styled.p`
  font-size: 0.88rem;
  color: #9f8b78;
`;

/* 공통 섹션 */

const Section = styled.section`
  padding: 1.75rem 1.25rem 2.25rem;
  background: ${({ $bgGradient }) => $bgGradient || "#fff7f0"};
`;

const SectionIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const SectionLabel = styled.div`
  margin-top: 0.35rem;
  font-size: 0.8rem;
  color: #ff8a3d;
  font-weight: 600;
`;

const SectionIconHouse = styled.div`
  font-size: 2rem;
`;

const SectionIconLetter = styled.div`
  font-size: 2rem;
`;

const SectionIconMyHall = styled.div`
  font-size: 2rem;
`;

const SectionIconReserve = styled.div`
  font-size: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #4b3a30;
  text-align: center;
  margin-bottom: 0.4rem;
`;

const SectionSubtitle = styled.p`
  font-size: 0.86rem;
  color: #9f8b78;
  text-align: center;
  margin-bottom: 1.3rem;
  line-height: 1.5;
`;

/* 카드 스크롤 영역 */

const CardScrollWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PhotoCard = styled.article`
  min-width: 230px;
  max-width: 230px;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 20px rgba(203, 146, 102, 0.26);
  overflow: hidden;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.5 : 1)};
`;

const MyHallCard = styled(PhotoCard)`
  min-width: 260px;
  max-width: 260px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem 0.8rem 0.5rem;
  gap: 0.45rem;
`;

const Avatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: #ffe0b2;
`;

const CardName = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #4b3a30;
`;

const CardImage = styled.div`
  width: 100%;
  height: 150px;
  background: ${({ $blue, $spring }) =>
    $spring
      ? "linear-gradient(135deg, #ffe0f0, #e8ffda)"
      : $blue
      ? "linear-gradient(135deg, #c1e3ff, #a2b7ff)"
      : "linear-gradient(135deg, #ffe6a7, #ffb6c1)"};
`;

const CardBody = styled.div`
  padding: 0.8rem 0.9rem 0.9rem;
`;

const CardDate = styled.div`
  font-size: 0.72rem;
  color: #b19b86;
  margin-bottom: 0.35rem;
`;

const CardText = styled.p`
  font-size: 0.8rem;
  color: #4b3a30;
  line-height: 1.45;
`;

/* 편지 프리뷰 */

const LetterPreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LetterPaper = styled.div`
  width: 100%;
  max-width: 320px;
  background: #fffdf7;
  border-radius: 18px;
  padding: 1.1rem 1.1rem 1.2rem;
  box-shadow: 0 10px 22px rgba(196, 151, 132, 0.25);
`;

const LetterHeader = styled.div`
  font-size: 0.86rem;
  font-weight: 600;
  color: #4b3a30;
  margin-bottom: 0.65rem;
`;

const LetterBody = styled.p`
  font-size: 0.76rem;
  color: #705c4c;
  line-height: 1.6;
  margin-bottom: 0.75rem;
`;

const LetterFooter = styled.div`
  font-size: 0.72rem;
  color: #b19b86;
  text-align: right;
`;

/* 사전 예약 폼 */

const ReserveForm = styled.div`
  margin-top: 0.3rem;
  background: #ffffff;
  border-radius: 18px;
  padding: 1.1rem 1rem 1.3rem;
  box-shadow: 0 12px 24px rgba(216, 148, 118, 0.3);
`;

const FormRow = styled.div`
  margin-bottom: 0.85rem;
`;

const FormLabel = styled.div`
  font-size: 0.78rem;
  font-weight: 600;
  color: #705c4c;
  margin-bottom: 0.3rem;
`;

const FormInput = styled.input`
  width: 100%;
  border-radius: 10px;
  border: 1px solid #ffe0c2;
  padding: 0.55rem 0.7rem;
  font-size: 0.78rem;
  outline: none;
  background: #fffaf4;

  &::placeholder {
    color: #c1ab96;
  }
`;

const SelectRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FormSelect = styled.select`
  flex: 1;
  border-radius: 10px;
  border: 1px solid #ffe0c2;
  padding: 0.5rem 0.7rem;
  font-size: 0.78rem;
  outline: none;
  background: #fffaf4;
`;

const ReserveButton = styled.button`
  margin-top: 0.2rem;
  width: 100%;
  border-radius: 999px;
  border: none;
  padding: 0.7rem 1rem;
  font-size: 0.86rem;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(90deg, #ffb86c, #ff7a7a);
  box-shadow: 0 6px 18px rgba(255, 138, 61, 0.45);
`;

const ReserveNotice = styled.p`
  margin-top: 0.7rem;
  font-size: 0.75rem;
  color: #b19b86;
  text-align: center;
  line-height: 1.5;
`;

/* Footer */

const Footer = styled.footer`
  padding: 1.75rem 1.25rem 2.5rem;
  text-align: center;
  background: #fff7f0;
`;

const FooterLogo = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: #ff8a3d;
  margin-bottom: 0.3rem;
`;

const FooterText = styled.div`
  font-size: 0.75rem;
  color: #b19b86;
`;

/* 플로팅 버튼 */

const FloatingButton = styled.button`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 88px; /* 스크린 중간보다는 살짝 위 – 두 번째 스샷 위치 느낌 */
  width: calc(100% - 3rem);
  max-width: 380px;
  height: 52px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(90deg, #ffb86c, #ff7a7a);
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 700;
  box-shadow: 0 10px 24px rgba(255, 141, 60, 0.5);
  z-index: 30;
`;
