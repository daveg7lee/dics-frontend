/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Popup from 'reactjs-popup';
import styled from 'styled-components';

const StyledPopup = styled(Popup)`
  &-overlay {
    background: rgba(0, 0, 0, 0.5);
  }
  &-content {
    border-radius: 5px;
    width: 100%;
    background-color: white;
    @media (min-width: 1025px) {
      width: 90vw;
    }
    overflow-y: auto;
    height: 90vh;
  }
`;

const PopupContainer = styled.div`
  padding: 1rem;
`;

export default ({ trigger, contents }) => {
  return (
    <StyledPopup trigger={trigger} modal nested>
      {() => <PopupContainer>{contents}</PopupContainer>}
    </StyledPopup>
  );
};
