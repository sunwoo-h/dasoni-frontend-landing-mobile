import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Footer from "./components/Footer";
import FloatingReserveButton from "./components/FloatingReserveButton";
import GlobalStyle from "./components/GlobalStyle";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import LettersSection from "./components/sections/LettersSection";
import MemorialSection from "./components/sections/MemorialSection";
import MyHallSection from "./components/sections/MyHallSection";
import ReserveSection from "./components/sections/ReserveSection";

export default function App() {
  const [activeTab, setActiveTab] = useState("memorial");
  const [hideFloating, setHideFloating] = useState(false);
  const [isInlineVisible, setIsInlineVisible] = useState(true);

  const inlineReserveRef = useRef(null);
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

  const handleTabClick = (key) => {
    const targetRef = sectionRefs[key];
    if (!targetRef || !targetRef.current) return;

    const headerOffset = 72;
    const rect = targetRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;

    window.scrollTo({
      top: rect.top + scrollTop - headerOffset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 72;
      const scrollPosition = window.scrollY + headerOffset + 1;
      const order = ["memorial", "letters", "myHall", "reserve"];

      let nextActive = order[0];
      order.forEach((key) => {
        const ref = sectionRefs[key];
        if (ref.current && scrollPosition >= ref.current.offsetTop) {
          nextActive = key;
        }
      });

      setActiveTab((prev) => (prev !== nextActive ? nextActive : prev));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const reserveObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (reserveRef.current && entry.target === reserveRef.current) {
            setHideFloating(entry.isIntersecting);
          }
        });
      },
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" }
    );

    const inlineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            inlineReserveRef.current &&
            entry.target === inlineReserveRef.current
          ) {
            setIsInlineVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0 }
    );

    if (reserveRef.current) reserveObserver.observe(reserveRef.current);
    if (inlineReserveRef.current)
      inlineObserver.observe(inlineReserveRef.current);

    return () => {
      reserveObserver.disconnect();
      inlineObserver.disconnect();
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <Header
          inlineRef={inlineReserveRef}
          onReserveClick={() => handleTabClick("reserve")}
        />
        <TabBar activeTab={activeTab} onTabClick={handleTabClick} />

        <MemorialSection ref={memorialRef} />
        <LettersSection ref={lettersRef} />
        <MyHallSection ref={myHallRef} />
        <ReserveSection ref={reserveRef} />

        <Footer />

        {!isInlineVisible && !hideFloating && (
          <FloatingReserveButton onClick={() => handleTabClick("reserve")} />
        )}
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`
  max-width: 430px;
  margin: 0 auto;
  background: #fff7f0;
`;
