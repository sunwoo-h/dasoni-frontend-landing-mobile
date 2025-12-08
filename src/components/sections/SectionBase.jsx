import styled from "styled-components";

export const SectionContainer = styled.div`
  background: ${({ $bgGradient }) => $bgGradient || "#fff7f0"};
`;

export const SectionIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const SectionLabel = styled.div`
  color: #ffbc67;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: 150%; /* 30px */
  margin-bottom: 35px;
`;

export const SectionTitle = styled.h2`
  color: var(--70, #4a4a4a);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 145%; /* 23.2px */
  margin-bottom: 4px;
`;

export const SectionSubtitle = styled.p`
  color: var(--70, #4a4a4a);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 134%; /* 18.76px */
`;

export const CardScrollWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  overflow-x: auto;
  padding-bottom: 105px;
  padding-left: 20px;
  padding-right: 20px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PhotoCard = styled.article`
  min-width: 230px;
  max-width: 230px;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 20px rgba(203, 146, 102, 0.26);
  overflow: hidden;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.5 : 1)};
`;

export const MyHallCard = styled(PhotoCard)`
  min-width: 260px;
  max-width: 260px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem 0.8rem 0.5rem;
  gap: 0.45rem;
`;

export const Avatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: #ffe0b2;
`;

export const CardName = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #4b3a30;
`;

export const CardImage = styled.div`
  width: 100%;
  height: 150px;
  background: ${({ $blue, $spring }) =>
    $spring
      ? "linear-gradient(135deg, #ffe0f0, #e8ffda)"
      : $blue
      ? "linear-gradient(135deg, #c1e3ff, #a2b7ff)"
      : "linear-gradient(135deg, #ffe6a7, #ffb6c1)"};
`;

export const CardBody = styled.div`
  padding: 0.8rem 0.9rem 0.9rem;
`;

export const CardDate = styled.div`
  font-size: 0.72rem;
  color: #b19b86;
  margin-bottom: 0.35rem;
`;

export const CardText = styled.p`
  font-size: 0.8rem;
  color: #4b3a30;
  line-height: 1.45;
`;
