import { MenuItem } from '@blueprintjs/core';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import logoSvg from 'assets/images/sovryn-logo-white.svg';
import { translations } from 'locales/i18n';

import { media } from '../../../styles/media';
import { CHAIN_ID } from '../../containers/BlockChainProvider/classifiers';
import { WalletConnectorButton } from '../../containers/BlockChainProvider/components/WalletConnectorButton';
import { selectBlockChainProvider } from '../../containers/BlockChainProvider/selectors';
import { LanguageToggle } from '../LanguageToggle';

import './index.scss';

export function Header() {
  const { chainId, network } = useSelector(selectBlockChainProvider);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const node = useRef(null as any);
  const StyledMenu = styled.nav.attrs(_ => ({ open: open }))`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: black;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
    height: 100%;
    text-align: left;
    padding: 4rem 2rem 2rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    transition: transform 0.3s ease-in-out;
    z-index: 9;
    width: 100%;
    li {
      list-style-type: none;
    }
    a {
      font-size: 1.2rem;
      padding: 1.5rem 0;
      font-weight: bold;
      letter-spacing: 0.5rem;
      color: white;
      text-decoration: none;
      transition: color 0.3s linear;
      text-align: center;
    }
  `;
  const StyledBurger = styled.button.attrs(_ => ({ open: open }))`
    position: absolute;
    top: 1.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;
    &:focus {
      outline: none;
    }
    div {
      width: 2rem;
      height: 0.25rem;
      background: white;
      border-radius: 10px;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;
      :first-child {
        transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
      }
      :nth-child(2) {
        opacity: ${({ open }) => (open ? '0' : '1')};
        transform: ${({ open }) =>
          open ? 'translateX(20px)' : 'translateX(0)'};
      }
      :nth-child(3) {
        transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
      }
    }
  `;

  const Menu = ({ open, setOpen }) => {
    return <StyledMenu open={open}>{menuItems}</StyledMenu>;
  };

  const Burger = ({ open, setOpen }) => {
    return (
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
    );
  };

  const pages = [
    {
      to: 'https://babelfish.netlify.app',
      title: t(translations.mainMenu.dapp),
    },
    {
      to: 'https://babelfish.money/',
      title: t(translations.mainMenu.help),
    },
  ];

  const menuItems = pages.map((item, index) => {
    let link: {
      to: string;
      title: string;
      exact: boolean;
      onClick?: () => void;
    } = item as any;

    if (link.to.startsWith('http')) {
      return <MenuItem key={index} text={link.title} href={link.to} />;
    }

    return (
      <MenuItem
        key={index}
        text={link.title}
        onClick={() => (link.onClick ? link.onClick() : history.push(link.to))}
      />
    );
  });

  useEffect(() => {
    const body = document.body;
    if (open) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }
    return () => {
      body.classList.remove('overflow-hidden');
    };
  }, [open]);

  const StyledButton = styled.button.attrs(_ => ({
    type: 'button',
  }))`
    border: none;
    background: none;
    color: var(--white);
    height: 50px;
    text-align: center;
    border: 2px solid;
    white-space: nowrap;
    width: fit-content;
    margin: 0;
    padding: 0px 20px;
    font-weight: 100;
    color: #32f05f;
    font-weight: bold;
    font-size: 16px;
    font-family: 'ArbelRegular';
    letter-spacing: -1px;
    text-transform: capitalize;
    transition: all 0.3s;
    border-radius: 10px;

    &:hover {
      background: #32f05e22 !important;
    }

    &:active,
    &:focus {
      background: #32f05e22 !important;
      outline: none;
    }
  `;
  console.log(location.pathname);
  return (
    <>
      {CHAIN_ID !== chainId && (
        <div className="bg-red py-3 text-center text-black font-bold">
          {[30, 31].includes(chainId) ? (
            <>You are connected to RSK {network} right now.</>
          ) : (
            <>You are in wrong network!</>
          )}{' '}
          Switch to RSK {CHAIN_ID === 30 ? 'mainnet' : 'testnet'} to interact
          with bitocracy.
        </div>
      )}
      <header className="bg-black mb-2">
        <div style={{padding: '20px 20px'}} className="flex min-h justify-between items-center mb-2">
          <a
            href="https://babelfish.netlify.app"
            rel="noopener noreferrer"
            className="flex items-center hover:no-underline text-white font-normal"
          >
            <StyledLogo src={logoSvg} />{' '}
            <span className="ml-2 text-xl no-underline">BabelFish.Money</span>
          </a>
          <div className="flex justify-start items-center">
            <div className="mr-2">
              <StyledButton
                onClick={() => {
                  location.pathname === '/stake'
                    ? history.push('/')
                    : history.push('/stake');
                }}
                className="flex justify-center items-center"
              >
                {location.pathname === '/stake'
                  ? 'GO TO GOVERNANCE '
                  : 'GO TO STAKE'}{' '}
              </StyledButton>
            </div>
            <WalletConnectorButton />
          </div>
        </div>
      </header>
    </>
  );
}
const StyledLogo = styled.img.attrs(_ => ({
  alt: '',
}))`
  width: 50px;
  height: 50px;
  ${media.xl`
    width: 48px;
    height: 48px;
    margin: 0;
  `}
`;

