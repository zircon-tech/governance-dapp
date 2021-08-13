import { Icon, Spinner } from '@blueprintjs/core';
import { useWalletContext } from 'react-wallet';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { translations } from 'locales/i18n';
import { prettyTx } from 'utils/helpers';
import { media } from '../../../../../styles/media';
import { WalletButton } from 'react-wallet';

export function WalletConnectorButton() {
  const {
    connected,
    loading: connecting,
    address,
    connect,
    disconnect,
  } = useWalletContext();
  const { t } = useTranslation();
  return (
    <>
      <WalletButtonContainer className="justify-center items-center flex">
        {!connected && !address ? (
          <WalletButton />
        ) : (
          <div>
            <StyledButtonAuth className="engage-wallet w-auto justify-end items-center flex cursor-pointer">
              <span className="flex flex-nowrap flex-row items-center w-100 justify-between">
                <span>{prettyTx(address, 4, 4)}</span>
                <Icon
                  icon="log-out"
                  className="logout"
                  onClick={() => disconnect()}
                />
              </span>
            </StyledButtonAuth>
          </div>
        )}
      </WalletButtonContainer>
    </>
  );
}

const WalletButtonContainer = styled.div`
  font-family: 'ArbelRegular' !important;
  font-weight: 500 !important;
  color: black;
`;

const StyledButtonAuth = styled.button.attrs(_ => ({
  type: 'button',
}))`
  background: #383838;
  height: 50px;
  width: calc(fit-content + 40px);
  padding: 0 0 0 20px;
  border-radius: 6px;
  font-weight: 100;
  font-size: 14px;
  font-family: 'Work Sans', sans-serif;
  letter-spacing: 0;
  display: flex;
  align-items: center;
  color: white;
  &:active,
  &:focus {
    outline: none;
  }

  .logout {
    height: 50px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #686868;
    cursor: pointer;
    transition: background 0.3s;
    color: #32f05f;
    border-radius: 0 6px 6px 0;
    margin-left: 20px;

    &:hover {
      background: #32f05e3b;
    }
  }
`;
