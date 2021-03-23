/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.5);
  }
  &-content {
    border-radius: 5px;
    width: 100%;
    @media (min-width: 1025px) {
      width: 40vw;
    }
  }
`;

const PopupContainer = styled.div`
  padding: 1rem;
`;

export default ({ trigger, contents }) => {
  return (
    <StyledPopup trigger={trigger} modal nested>
      {(close) => <PopupContainer>{contents}</PopupContainer>}
    </StyledPopup>
  );
};
