import React from "react";
import styled from "styled-components";

const tabs = [
  { id: "memorial", label: "추모관" },
  { id: "letters", label: "편지함" },
  { id: "myHall", label: "나의 추모관" },
  { id: "reserve", label: "사전 예약" },
];

function TabBar({ activeTab, onTabClick }) {
  return (
    <TabBarContainer>
      <TabList>
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            type="button"
            $active={activeTab === tab.id}
            onClick={() => onTabClick(tab.id)}
          >
            {tab.label}
          </TabItem>
        ))}
      </TabList>
    </TabBarContainer>
  );
}

const TabBarContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 36px 11px 0 9px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f3f3f3;
  background: #fff;
  box-shadow: 0 4px 8.7px 0 rgba(0, 0, 0, 0.03);
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

export default TabBar;
