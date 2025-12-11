// src/features/Landing/components/LettersSection.jsx
import React, { forwardRef, useState, useEffect, useRef } from "react";
import {
  SectionContainer,
  SectionIconWrapper,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
} from "./SectionBase";
import styled, { keyframes, css } from "styled-components";

import ImgPostBox from "../../assets/img-postbox.png";
import ImgLetter1 from "../../assets/img-letter-1.svg";
import ImgLetter2 from "../../assets/img-letter-2.svg";
import ImgLetter3 from "../../assets/img-letter-3.svg";
import ImgTape from "../../assets/img-tape.png";
import ImgWheelLeft from "../../assets/img-wheel-left.png";
import ImgWheelRight from "../../assets/img-wheel-right.png";
import SampleVoice from "../../assets/sample-voice.mp3";

import PlayIcon from "../../assets/icon-play.svg";
import PauseIcon from "../../assets/icon-pause.svg";

const LETTER_IMAGES = [ImgLetter1, ImgLetter2, ImgLetter3];

const LettersSection = forwardRef((_, ref) => {
  // 1번(0 index)이 맨 앞, 그 뒤로 2, 3
  const [order, setOrder] = useState([0, 1, 2]);

  // 섹션 상단(아이콘/타이틀/카드) 애니메이션용
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // 음성 섹션(아래쪽) 애니메이션용
  const [isVoiceVisible, setIsVoiceVisible] = useState(false);
  const voiceRef = useRef(null);

  // 🎵 오디오 플레이어 상태
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  // 🎵 오디오 이벤트 핸들링
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleProgressClick = (e) => {
    if (!duration || !audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
  };

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
            style={{ marginTop: "35px", marginBottom: "6px", width: "77px" }}
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

              const shouldWiggle =
                isFront && !dragState.isDragging && leaving.dir === 0;

              return (
                <SwipeCard
                  key={cardIndex}
                  style={{ transform, opacity, filter, zIndex }}
                  {...handlers}
                >
                  <CardVisual $wiggle={shouldWiggle}>
                    <LetterImage src={image} alt={`letter-${cardIndex + 1}`} />
                  </CardVisual>
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
          <TapeWrapper>
            {/* 뒤에서 움직이는 막대들 */}
            <WaveBars>
              {Array.from({ length: 50 }).map((_, idx) => (
                <WaveBar
                  key={idx}
                  $delay={idx}
                  // 각 막대마다 약간 다른 속도로 흔들리게
                  $speed={0.9 + (idx % 5) * 0.7}
                />
              ))}
            </WaveBars>
            <TapeImg src={ImgTape} />
            {/* 왼쪽 휠 */}
            <TapeWheelLeft src={ImgWheelLeft} alt="left-wheel" />
            {/* 오른쪽 휠 */}
            <TapeWheelRight src={ImgWheelRight} alt="right-wheel" />
          </TapeWrapper>
        </FadeInItem>
        {/* 커스텀 음성 플레이어 */}
        <VoicePlayerWrapper $visible={isVoiceVisible}>
          <PlayerPlayButton
            src={isPlaying ? PauseIcon : PlayIcon}
            alt={isPlaying ? "일시 정지" : "재생"}
            onClick={handlePlayPause}
          />
          <PlayerTime>
            {formatTime(currentTime)} / {formatTime(duration)}
          </PlayerTime>
          <PlayerProgressWrapper onClick={handleProgressClick}>
            <PlayerProgress
              value={duration ? (currentTime / duration) * 100 : 0}
            >
              <PlayerProgressCircle />
            </PlayerProgress>
          </PlayerProgressWrapper>
          <audio ref={audioRef} src={SampleVoice} preload="metadata" />
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
  width: 100%;
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
  touch-action: none;
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;
`;

const CardVisual = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 4.5px -2.7px 1.8px 0 rgba(0, 0, 0, 0.22);
  background-color: #fffdf7;
  border-radius: 0; /* 필요하면 radius 추가 */

  transform-origin: center bottom;

  animation: ${({ $wiggle }) =>
    $wiggle
      ? css`
          ${cardWiggle} 1.8s ease-in-out infinite
        `
      : "none"};
`;

const LetterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

const TapeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end; /* 👉 오른쪽 끝으로 붙이기 */
  position: relative; /* 🔥 휠 이미지를 위에 올리기 위해 필요 */
`;

const TapeImg = styled.img`
  display: block;
  width: 167px;
  margin-right: 60px;
  z-index: 0;
`;

const tapeWheelSpin = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

// 🔸 왼쪽 휠
const TapeWheelLeft = styled.img`
  position: absolute;

  /* TapeImg 기준 위치 (대략 값이니까 필요하면 숫자 살짝씩 조정해도 됨) */
  right: 153px;
  top: 50%;

  width: 25px;
  transform: translate(-50%, -50%);
  animation: ${tapeWheelSpin} 2.2s linear infinite;
`;

// 🔸 오른쪽 휠
const TapeWheelRight = styled.img`
  position: absolute;

  right: 84px;
  top: 50%;

  width: 25px;
  transform: translate(-50%, -50%);
  animation: ${tapeWheelSpin} 2.2s linear infinite;
`;

const barBounce = keyframes`
  0%   { transform: scaleY(0.7); }
  20%  { transform: scaleY(1.3); }
  40%  { transform: scaleY(0.85); }
  60%  { transform: scaleY(1.15); }
  80%  { transform: scaleY(0.9); }
  100% { transform: scaleY(0.7); }
`;

/* 막대 전체 래퍼 - 테이프 뒤에 깔림 */
const WaveBars = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px; /* 👉 너가 말한 gap 4px */
  pointer-events: none; /* 클릭 방해 X */
  z-index: 0;
`;

const WaveBar = styled.div`
  width: 3.5px;
  height: 60px;
  border-radius: 150px;
  background: rgba(253, 185, 145, 0.43);

  /* ✅ 가운데를 기준으로 위아래로 늘어나는 느낌 */
  transform-origin: center;
  transform: scaleY(0.7); /* 초기 길이 */

  /* ✅ 전체 속도 살짝 느리게 (1.8~2.4초 사이) */
  animation: ${barBounce} ${({ $speed }) => $speed || 1.9}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => `${$delay * 0.06}s`};
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
  width: 100%;
`;

/* 🎵 MyHall VoiceRecord 느낌의 플레이어 카드 */
const VoicePlayerWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  height: 3rem;
  margin: 55px 0 15px 0;

  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: #fff;
  padding: 0 1rem;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.04);

  /* 페이드 인 효과 */
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "20px")});
  transition: opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s;

  audio {
    display: none;
  }
`;

const PlayerPlayButton = styled.img`
  flex-shrink: 0;
  margin-right: 0.75rem;
  margin-left: 0.75rem;
  cursor: pointer;
`;

const PlayerTime = styled.div`
  color: var(--100, #000);
  font-family: Pretendard;
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  text-align: center;
  margin-right: 1rem;
`;

const PlayerProgressWrapper = styled.div`
  flex: 1;
  height: 0.4375rem;
  border-radius: 1.25rem;
  background: var(--50, #7a7a7a);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
`;

const PlayerProgress = styled.div`
  width: ${({ value }) => value}%;
  height: 100%;
  background-color: #0e0e0e;
  border-radius: 1.25rem;
  transition: width 0.1s linear;
  position: relative;
`;

const PlayerProgressCircle = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 0.8125rem;
  height: 0.8125rem;
  background: #0e0e0e;
  border-radius: 50%;
`;

const cardWiggle = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-0.5deg);
  }
  75% {
    transform: rotate(0.5deg);
  }
`;
