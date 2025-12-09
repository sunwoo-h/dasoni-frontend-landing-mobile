// src/features/Landing/components/LettersSection.jsx
import React, { forwardRef, useState, useEffect, useRef } from "react";
import {
  SectionContainer,
  SectionIconWrapper,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from "./SectionBase";
import styled from "styled-components";

import ImgPostBox from "../../assets/img-postbox.svg";
import ImgLetter1 from "../../assets/img-letter-1.svg";
import ImgLetter2 from "../../assets/img-letter-2.svg";
import ImgLetter3 from "../../assets/img-letter-3.svg";
import ImgTape from "../../assets/img-tape.svg";
import SampleVoice from "../../assets/sample-voice.mp3";

const LETTER_IMAGES = [ImgLetter1, ImgLetter2, ImgLetter3];

const LettersSection = forwardRef((_, ref) => {
  // 1번(0 index)이 맨 앞, 그 뒤로 2, 3
  const [order, setOrder] = useState([0, 1, 2]);

  // 섹션 상단(아이콘/타이틀/카드) 애니메이션용
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // 음성 섹션(아래쪽) 애니메이션용
  const [isVoiceVisible, setIsVoiceVisible] = useState(false);
  const voiceRef = useRef(null);

  // 상단 섹션 진입 감지
  useEffect(() => {
    if (!ref || !("current" in ref)) return;
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionVisible(true);
            observer.unobserve(entry.target); // 한 번만
          }
        });
      },
      { threshold: 0.3 } // 섹션의 30% 보이면 발동
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [ref]);

  // 음성 섹션 진입 감지
  useEffect(() => {
    const target = voiceRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVoiceVisible(true);
            observer.unobserve(entry.target); // 한 번만
          }
        });
      },
      { threshold: 0.9 } // 음성 블록이 어느 정도 보이면 발동
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, []);

  // 드래그 상태
  const [dragState, setDragState] = useState({
    isDragging: false,
    activeId: null,
    startX: 0,
    startY: 0,
    dx: 0,
    dy: 0,
  });

  // 카드가 화면 밖으로 날아가는 상태
  const [leaving, setLeaving] = useState({
    cardId: null,
    dir: 0,
  });

  const frontCardId = order[0];

  const startDrag = (x, y) => {
    if (leaving.dir !== 0) return; // 애니메이션 중이면 무시

    setDragState({
      isDragging: true,
      activeId: frontCardId,
      startX: x,
      startY: y,
      dx: 0,
      dy: 0,
    });
  };

  const moveDrag = (x, y) => {
    setDragState((prev) => {
      if (!prev.isDragging) return prev;
      return {
        ...prev,
        dx: x - prev.startX,
        dy: y - prev.startY,
      };
    });
  };

  const endDrag = () => {
    setDragState((prev) => {
      if (!prev.isDragging) return prev;

      const threshold = 80;
      const { dx, activeId } = prev;

      if (Math.abs(dx) > threshold && activeId !== null) {
        const dir = dx > 0 ? 1 : -1;

        setLeaving({ dir, cardId: activeId });

        // 0.3초 후 카드 순서 재정렬 (앞에 있던 카드를 맨 뒤로 보냄)
        setTimeout(() => {
          setOrder((old) => {
            if (old[0] !== activeId) return old;
            const [, ...rest] = old;
            return [...rest, activeId];
          });
          setLeaving({ dir: 0, cardId: null });
        }, 300);
      }

      return {
        isDragging: false,
        activeId: null,
        startX: 0,
        startY: 0,
        dx: 0,
        dy: 0,
      };
    });
  };

  const handleMouseDown = (e) => {
    startDrag(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!dragState.isDragging) return;
    moveDrag(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    if (!dragState.isDragging) return;
    endDrag();
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (!dragState.isDragging) return;
    const touch = e.touches[0];
    moveDrag(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    if (!dragState.isDragging) return;
    endDrag();
  };

  return (
    <SectionContainer
      ref={ref}
      data-tab-id="letters"
      $bgGradient="linear-gradient(180deg, #FFEBEB 0%, #FFFCFC 28.81%, #FFFCFC 77.84%, #FFEBEB 100%)"
      style={{ paddingBottom: "90px" }}
    >
      {/* 🔹 섹션 상단: 편지함 아이콘 / 타이틀 / 카드 스택 */}
      <FadeInItem $visible={isSectionVisible} $delay="0s">
        <SectionIconWrapper>
          <img
            src={ImgPostBox}
            style={{ marginTop: "35px", marginBottom: "6px" }}
            alt="postbox"
          />
          <SectionLabel style={{ color: "#E96D6D" }}>편지함</SectionLabel>
        </SectionIconWrapper>
      </FadeInItem>

      <FadeInItem $visible={isSectionVisible} $delay="0.1s">
        <LetterTitle>보고픈 마음을 담아 고인께 편지를 남겨보세요</LetterTitle>
      </FadeInItem>

      <FadeInItem $visible={isSectionVisible} $delay="0.2s">
        <LetterStackWrapper>
          <LetterCardStack>
            {order.map((cardIndex, idx) => {
              const image = LETTER_IMAGES[cardIndex];

              const isFront = idx === 0;
              const depth = idx; // 0: 맨 앞, 1·2: 뒤쪽 카드

              let transform = "";
              let opacity = 1;
              let filter = "brightness(1)";
              let zIndex = 10 - idx;

              if (isFront) {
                // 맨 앞 카드
                if (
                  dragState.isDragging &&
                  dragState.activeId === cardIndex &&
                  leaving.dir === 0
                ) {
                  const rotate = dragState.dx * 0.08;
                  transform = `translate(${dragState.dx}px, ${dragState.dy}px) rotate(${rotate}deg)`;
                } else if (leaving.dir !== 0 && leaving.cardId === cardIndex) {
                  const endX = 260 * leaving.dir;
                  transform = `translate(${endX}px, 40px) rotate(${
                    leaving.dir * 25
                  }deg)`;
                  opacity = 0;
                } else {
                  transform = "translate(0px, 0px) rotate(0deg)";
                }
              } else {
                // 뒤에 있는 카드들: 오른쪽으로 겹쳐지게
                const scale = 1 - depth * 0.04;
                const tx = depth * 20; // 👉 오른쪽으로 이동
                const ty = depth * -25;
                const rot = depth * 3;

                transform = `scale(${scale}) translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
                opacity = 1 - depth * 0.08;
                filter = `brightness(${1 - depth * 0.15})`;
              }

              const handlers = isFront
                ? {
                    onMouseDown: handleMouseDown,
                    onMouseMove: handleMouseMove,
                    onMouseUp: handleMouseUp,
                    onMouseLeave: handleMouseUp,
                    onTouchStart: handleTouchStart,
                    onTouchMove: handleTouchMove,
                    onTouchEnd: handleTouchEnd,
                  }
                : {};

              return (
                <SwipeCard
                  key={cardIndex}
                  style={{ transform, opacity, filter, zIndex }}
                  {...handlers}
                >
                  <LetterImage src={image} alt={`letter-${cardIndex + 1}`} />
                </SwipeCard>
              );
            })}
          </LetterCardStack>
        </LetterStackWrapper>
      </FadeInItem>

      {/* 🔹 음성 섹션 전체 래퍼: 이 부분에 도달했을 때 별도로 애니메이션 */}
      <VoiceSectionWrapper ref={voiceRef}>
        <FadeInItem $visible={isVoiceVisible} $delay="0s">
          <SectionTitle style={{ marginTop: "110px" }}>
            고인의 목소리로 재현한
            <br />
            AI 음성 편지를 받을 수 있어요
          </SectionTitle>
        </FadeInItem>

        <FadeInItem $visible={isVoiceVisible} $delay="0.1s">
          <SectionSubtitle style={{ marginBottom: "80px" }}>
            나를 부르던 다정한 애칭, 우리가 나눴던 추억을
            <br />
            목소리로 다시 만날 수 있어요
          </SectionSubtitle>
        </FadeInItem>

        <FadeInItem $visible={isVoiceVisible} $delay="0.2s">
          <TapeImg src={ImgTape} />
        </FadeInItem>

        <VoicePlayerWrapper $visible={isVoiceVisible}>
          <audio controls src={SampleVoice}>
            브라우저에서 오디오를 지원하지 않습니다.
          </audio>
        </VoicePlayerWrapper>

        <FadeInItem $visible={isVoiceVisible} $delay="0.4s">
          <VoiceText>
            실제 ㅇㅇㅇ씨의 음성으로 재현한 테스트 편지입니다.
          </VoiceText>
        </FadeInItem>
      </VoiceSectionWrapper>
    </SectionContainer>
  );
});

LettersSection.displayName = "LettersSection";

export default LettersSection;

/* ---------- styled-components ---------- */

const FadeInItem = styled.div`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "20px")});
  transition: opacity 0.6s ease-out ${({ $delay }) => $delay || "0s"},
    transform 0.6s ease-out ${({ $delay }) => $delay || "0s"};
`;

const LetterTitle = styled.div`
  color: var(--50, #7a7a7a);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 145%; /* 23.2px */
`;

const LetterStackWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const LetterCardStack = styled.div`
  position: relative;
  width: 260px;
  height: 413px;
  background: transparent;
`;

const SwipeCard = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  box-shadow: 4.5px -2.7px 1.8px 0 rgba(0, 0, 0, 0.22);
  touch-action: none;
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
  background-color: #fffdf7;
`;

const LetterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

const TapeImg = styled.img`
  justify-self: flex-end;
  display: block;
`;

const VoiceText = styled.div`
  color: #ffc8c8;
  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 161%; /* 20.93px */
`;

const VoiceSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VoicePlayerWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  margin-bottom: 18px;

  /* ✅ 페이드 인 효과 */
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "20px")});
  transition: opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s;

  audio {
    width: 100%;
  }
`;
