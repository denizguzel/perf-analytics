import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
`;

const StyledCardBody = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
`;

type Props = React.HTMLProps<HTMLDivElement>;

const Card = React.forwardRef<HTMLDivElement, Props>(({ children }, ref) => (
  <StyledCard>
    <StyledCardBody ref={ref}>{children}</StyledCardBody>
  </StyledCard>
));

export default Card;
