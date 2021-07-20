import { Icon, Spinner } from '@blueprintjs/core';
import { useWalletContext } from '@sovryn/react-wallet';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import { translations } from 'locales/i18n';
import { prettyTx } from 'utils/helpers';

import { media } from '../../../../../styles/media';

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
      <div className="justify-center items-center flex">
        {!connected && !address ? (
          <StyledButton
            onClick={() => connect()}
            className="flex justify-center items-center"
          >
            {connecting && <Spinner size={22} />}
            {!connecting && (
              <>
                <span className='inline'>{t(translations.wallet.connect_btn)}</span>
              </>
            )}
          </StyledButton>
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
      </div>
    </>
  );
}

const StyledButtonAuth = styled.button.attrs(_ => ({
  type: 'button',
}))`
  background: #383838;
  height: 40px;
  padding: 0 0 0 2rem;
  border-radius: 6px;
  font-weight: 100;
  font-size: 14px;
  font-family: 'Work Sans', sans-serif;
  min-width: 165px;
  letter-spacing: 0;

  &:active,
  &:focus {
    outline: none;
  }

  .logout {
    height: 40px;
    padding: 12px 12px;
    background: #686868;
    cursor: pointer;
    transition: background 0.3s;
    color: #32f05f;
    border-radius: 0 6px 6px 0;
    margin-left: 1.6rem;

    &:hover {
      background: #32f05e3b;
    }
  }
`;

const StyledButton = styled.button.attrs(_ => ({
  type: 'button',
}))`
  border: none;
  background: none;
  color: var(--white);
  width: 48px;
  height: 48px;
  text-align: center;

  border: 2px solid;
  white-space: nowrap;
  width: auto;
  margin: 0;
  height: 40px;
  padding: 5px 26px;
  font-weight: 100;
  color: #32f05f;
  font-size: 18px;
  font-family: 'ArbelRegular';
  letter-spacing: -1px;
  text-transform: capitalize;
  transition: all 0.3s;
  border-radius: 10px;

  &:hover {
    background: #32f05e3b !important;
  }

  &:active,
  &:focus {
    background: #32f05e3b !important;
    outline: none;
  }
`;
