"use client"

import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import classNames from "classnames";
import Link from 'next/link';
import Image from 'next/image';

import {HeaderList} from '@/_mock/header.mock';
import HeaderDropdown from './HeaderDropdown';
import twitter from '@/../public/social/twitter.svg'
import discord from '@/../public/social/discord.svg'

import './Header.scss'
import {useWindowWidth} from "@react-hook/window-size";
import Cookies from "js-cookie";
import HeaderTop from "@/components/HeaderTop/HeaderTop";

type Props = {
    setHeaderWidth: Dispatch<SetStateAction<number>>
}

export default function Header({setHeaderWidth}: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisibleTopBar, setIsVisibleTopBar] = useState(true)

    const headerRef = useRef<HTMLElement>(null)
    const headerTopRef = useRef<HTMLDivElement>(null)

    const windowWidth = useWindowWidth()

    const setTopSpace = () => {
        const isSafari = typeof window !== 'undefined' ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false;
        if (headerRef.current && headerTopRef.current) {
            if (isSafari) {
                return `${headerRef.current?.offsetHeight}px`
            } else return `${headerRef.current?.offsetHeight - headerTopRef.current?.offsetHeight}px`
        }
    }

    const handleClick = () => {
        Cookies.set('hideTopBar', 'true', { expires: 7 });
        setIsVisibleTopBar(false);
    };

    useEffect(() => {
        const hideTopBar = Cookies.get('hideTopBar');
        if (hideTopBar) {
            setIsVisibleTopBar(false);
        }
    }, []);


    const setHeaderDropdown = () => {
        return HeaderList.map((item, index) => {
            return (
                <div className="nav__item">
                    <HeaderDropdown {...item} />
                </div>
            )
        })
    }

    useEffect(() => {
        if (headerRef.current) {
            setHeaderWidth(headerRef.current.offsetHeight)
        }
    }, [headerRef, isVisibleTopBar])

    useEffect(() => {
        if (windowWidth > 767.999) {
            setIsOpen(false)
        }
    }, [windowWidth])

    return (
        <>
            <div className="blur"/>
            <header ref={headerRef} className={classNames({
                'header': true,
                'header--open': isOpen
            })}>
                {/*<HeaderTop/>*/}
                <div className="header__inner">
                    <div className="container">
                        <div className="header__wrapper">
                            <div>
                                <Link href="/"><img src="/logo.svg" alt="" className="header__logo"/></Link>
                            </div>
                            <div>
                                <button className={classNames({
                                    'hamburger': true,
                                    'hamburger--active': isOpen
                                })} onClick={() => setIsOpen(!isOpen)}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 8H13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                        <path d="M2.5 4H13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                        <path d="M2.5 12H13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <nav
                                    style={{top: setTopSpace(), transition: '0.5s all'}}
                                    className={classNames({
                                            'nav': true
                                        }
                                    )}>
                                    <div></div>
                                    <div className="nav__section">
                                        {setHeaderDropdown()}
                                        <a href="https://coinlist.co/subsquid?utm_source=subsquid&utm_medium=web&utm_campaign=subsquid-community-sale"
                                           className="nav__item" target="_blank">Token</a>
                                    </div>
                                    {windowWidth < 1023.999 && (
                                        <div className="nav__section">
                                            <div className="nav__social">
                                                <a href="https://twitter.com/subsquid" target="_blank"
                                                   rel="noopener noreferrer">
                                                    <Image {...twitter} alt=''/>
                                                </a>
                                                <a href="https://discord.com/invite/subsquid" target="_blank"
                                                   rel="noopener noreferrer">
                                                    <Image {...discord} alt=''/>
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <div className="nav__section">
                                        {windowWidth > 1023.999 && (
                                            <div className="nav__social">
                                                <a href="https://twitter.com/subsquid" target="_blank"
                                                   rel="noopener noreferrer">
                                                    <Image {...twitter} alt=''/>
                                                </a>
                                                <a href="https://discord.com/invite/subsquid" target="_blank"
                                                   rel="noopener noreferrer">
                                                    <Image {...discord} alt=''/>
                                                </a>
                                            </div>
                                        )}
                                        <a href="https://app.subsquid.io/" className="nav__section__launch"
                                           target="_blank"><img src="/rocket.svg" alt="" className="header__logo"/>Launch
                                            app</a>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classNames({
                    'banner__nav': true,
                    'banner__nav--noMain': true,
                    'banner__nav--active': isOpen,
                })}>
                    <div className={"banner__navLogo"}>
                        <a href="/">
                            <img src={"/assets/icon.png"} alt="logo"/>
                            <svg width="103" height="16" viewBox="0 0 103 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M93.1711 11.6014H95.0074C97.1829 11.6014 98.9591 10.344 98.9591 7.50976C98.9591 4.67558 97.1829 3.39821 95.0074 3.39821H93.1711V11.6014ZM95.1271 14.5752H90.0176V0.424316H95.1471C99.3982 0.424316 102.252 3.13874 102.252 7.50976C102.252 11.8807 99.3982 14.5752 95.1271 14.5752Z"
                                    fill="currentColor"/>
                                <path d="M86.7561 14.5752H83.5625V0.424316H86.7561V14.5752Z" fill="currentColor"/>
                                <path
                                    d="M74.7999 14.8945C71.6863 14.8945 69.1914 13.0185 69.1914 9.46574V0.424316H72.345V9.20627C72.345 10.9227 73.303 11.7809 74.7999 11.7809C76.2967 11.7809 77.2547 10.9227 77.2547 9.20627V0.424316H80.4083V9.46574C80.4083 13.0185 77.9134 14.8945 74.7999 14.8945Z"
                                    fill="currentColor"/>
                                <path
                                    d="M52.1523 7.50984C52.1523 3.01907 55.5255 0.125 59.5172 0.125C63.489 0.125 66.8621 3.01907 66.8621 7.50984C66.8621 9.40593 66.2635 11.0027 65.2655 12.2202L67.0019 14.1162L64.9261 15.8727L63.1897 13.9567C62.1119 14.5553 60.8346 14.8747 59.5172 14.8747C55.5255 14.8747 52.1523 11.9807 52.1523 7.50984ZM55.4257 7.48987C55.4257 10.4438 57.5412 11.7611 59.5172 11.7611C59.9963 11.7611 60.4752 11.6813 60.9543 11.5216L58.8786 9.24627L60.9741 7.48987L63.0499 9.7652C63.3892 9.14647 63.5888 8.408 63.5888 7.48987C63.5888 4.53593 61.4732 3.19869 59.5172 3.19869C57.5412 3.19869 55.4257 4.53593 55.4257 7.48987Z"
                                    fill="currentColor"/>
                                <path
                                    d="M50.3674 3.89724L47.5331 4.69562C47.4334 4.03698 46.8945 2.91927 45.178 2.91927C44.0003 2.91927 43.2418 3.65776 43.2418 4.43616C43.2418 5.11476 43.6612 5.61373 44.6392 5.79336L46.5351 6.15262C49.2296 6.6516 50.6267 8.38802 50.6267 10.404C50.6267 12.6193 48.7705 14.8747 45.3976 14.8747C41.4856 14.8747 39.8089 12.34 39.6094 10.344L42.5034 9.64545C42.6231 10.9429 43.5014 12.0804 45.4374 12.0804C46.6749 12.0804 47.4334 11.4818 47.4334 10.6036C47.4334 9.88496 46.8545 9.36602 45.9165 9.1864L43.9805 8.82713C41.5854 8.36807 40.1283 6.77136 40.1283 4.67564C40.1283 2.00116 42.4836 0.125 45.1978 0.125C48.7307 0.125 50.0678 2.24064 50.3674 3.89724Z"
                                    fill="currentColor"/>
                                <path
                                    d="M28.1094 0.424316H33.3985C36.1927 0.424316 37.8094 2.04098 37.8094 4.21652C37.8094 5.67354 36.8912 6.87107 35.7336 7.25029C37.0109 7.54967 38.2485 8.72727 38.2485 10.5634C38.2485 12.8787 36.492 14.5752 33.8176 14.5752H28.1094V0.424316ZM31.1829 6.09267H32.8994C33.9972 6.09267 34.7158 5.51385 34.7158 4.55583C34.7158 3.63772 34.0969 3.03894 32.8596 3.03894H31.1829V6.09267ZM31.1829 12.0005H33.1589C34.3765 12.0005 35.1149 11.3618 35.1149 10.344C35.1149 9.36596 34.3963 8.68734 33.1589 8.68734H31.1829V12.0005Z"
                                    fill="currentColor"/>
                                <path
                                    d="M19.3467 14.8945C16.2332 14.8945 13.7383 13.0185 13.7383 9.46574V0.424316H16.8918V9.20627C16.8918 10.9227 17.8498 11.7809 19.3467 11.7809C20.8438 11.7809 21.8018 10.9227 21.8018 9.20627V0.424316H24.9554V9.46574C24.9554 13.0185 22.4605 14.8945 19.3467 14.8945Z"
                                    fill="currentColor"/>
                                <path
                                    d="M11.2558 3.89724L8.42182 4.69562C8.32205 4.03698 7.78294 2.91927 6.06649 2.91927C4.88894 2.91927 4.13049 3.65776 4.13049 4.43616C4.13049 5.11476 4.5496 5.61373 5.5276 5.79336L7.42382 6.15262C10.1183 6.6516 11.5154 8.38802 11.5154 10.404C11.5154 12.6193 9.65916 14.8747 6.28605 14.8747C2.37405 14.8747 0.697602 12.34 0.498047 10.344L3.39205 9.64545C3.51182 10.9429 4.39005 12.0804 6.32605 12.0804C7.5636 12.0804 8.32205 11.4818 8.32205 10.6036C8.32205 9.88496 7.74316 9.36602 6.80516 9.1864L4.86894 8.82713C2.47405 8.36807 1.01694 6.77136 1.01694 4.67564C1.01694 2.00116 3.37205 0.125 6.08649 0.125C9.61938 0.125 10.9565 2.24064 11.2558 3.89724Z"
                                    fill="currentColor"/>
                            </svg>
                        </a>
                    </div>
                    <div className={"banner__navList"}>
                        <button className={"din"}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M24.5 26H15.5C15.3674 26 15.2402 25.9473 15.1464 25.8536C15.0527 25.7598 15 25.6326 15 25.5V14.5C15 14.3674 15.0527 14.2402 15.1464 14.1464C15.2402 14.0527 15.3674 14 15.5 14H21.5L25 17.5V25.5C25 25.6326 24.9473 25.7598 24.8536 25.8536C24.7598 25.9473 24.6326 26 24.5 26Z"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path d="M21.5 14V17.5H25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                            Docs
                        </button>
                        <button className={"din"}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17 20C17 19.0111 17.2932 18.0444 17.8427 17.2222C18.3921 16.3999 19.173 15.759 20.0866 15.3806C21.0002 15.0022 22.0055 14.9031 22.9755 15.0961C23.9454 15.289 24.8363 15.7652 25.5355 16.4645C26.2348 17.1637 26.711 18.0546 26.9039 19.0246C27.0969 19.9945 26.9978 20.9998 26.6194 21.9134C26.241 22.827 25.6001 23.6079 24.7779 24.1573C23.9556 24.7068 22.9889 25 22 25H16.5C15.5717 25 14.6815 24.6313 14.0251 23.9749C13.3687 23.3185 13 22.4283 13 21.5C13 20.5717 13.3687 19.6815 14.0251 19.0251C14.6815 18.3688 15.5717 18 16.5 18C16.7928 17.9999 17.0846 18.0356 17.3688 18.1063"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                            Cloud
                        </button>
                        <button className={"din"}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 15V25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path
                                    d="M25.5 15H14.5C14.2239 15 14 15.2239 14 15.5V24.5C14 24.7761 14.2239 25 14.5 25H25.5C25.7761 25 26 24.7761 26 24.5V15.5C26 15.2239 25.7761 15 25.5 15Z"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                            Blog
                        </button>
                        <button className={"din"}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M23.4507 14H25.2907L21.2708 18.6596L26 25H22.2969L19.3967 21.1545L16.0782 25H14.2369L18.5367 20.0162L14 14H17.7969L20.4185 17.5149L23.4507 14ZM22.8048 23.883H23.8245L17.2429 15.0583H16.1488L22.8048 23.883Z"
                                    fill="currentColor"/>
                            </svg>
                            X
                        </button>
                        <button className={"din"}>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18 21.25C18.5523 21.25 19 20.8023 19 20.25C19 19.6977 18.5523 19.25 18 19.25C17.4477 19.25 17 19.6977 17 20.25C17 20.8023 17.4477 21.25 18 21.25Z"
                                    fill="currentColor"/>
                                <path
                                    d="M22 21.25C22.5523 21.25 23 20.8023 23 20.25C23 19.6977 22.5523 19.25 22 19.25C21.4477 19.25 21 19.6977 21 20.25C21 20.8023 21.4477 21.25 22 21.25Z"
                                    fill="currentColor"/>
                                <path
                                    d="M21.457 22.9125L22.4445 24.8812C22.4932 24.9835 22.576 25.0657 22.6786 25.1136C22.7813 25.1615 22.8974 25.1721 23.007 25.1437C24.5383 24.7687 25.8633 24.1187 26.8258 23.2812C26.8983 23.2172 26.951 23.1337 26.9776 23.0407C27.0042 22.9476 27.0036 22.8489 26.9758 22.7562L24.857 15.6812C24.8364 15.6088 24.7991 15.5423 24.7481 15.4869C24.6971 15.4315 24.6338 15.3889 24.5633 15.3625C23.9647 15.1169 23.3456 14.9245 22.7133 14.7875C22.5918 14.7609 22.4647 14.7799 22.3563 14.841C22.248 14.9021 22.1659 15.001 22.1258 15.1187L21.4695 17.0937"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path
                                    d="M18.544 22.9125L17.5565 24.8812C17.5078 24.9835 17.4251 25.0657 17.3224 25.1136C17.2198 25.1615 17.1036 25.1721 16.994 25.1437C15.4627 24.7687 14.1377 24.1187 13.1752 23.2812C13.1027 23.2172 13.05 23.1337 13.0234 23.0407C12.9968 22.9476 12.9974 22.8489 13.0252 22.7562L15.144 15.6812C15.1646 15.6088 15.2019 15.5423 15.2529 15.4869C15.304 15.4315 15.3672 15.3889 15.4377 15.3625C16.0363 15.1169 16.6554 14.9245 17.2877 14.7875C17.4092 14.7609 17.5363 14.7799 17.6447 14.841C17.753 14.9021 17.8351 15.001 17.8752 15.1187L18.5315 17.0937"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path
                                    d="M23.3172 22.5C22.3672 22.8187 21.2234 23 19.9984 23C18.7734 23 17.6297 22.8187 16.6797 22.5"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path
                                    d="M23 17.4C22.0236 17.1273 21.0138 16.9926 20 17C18.9862 16.9926 17.9764 17.1273 17 17.4"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                            Discord
                        </button>
                    </div>
                    <div className={"banner__navButtons"}>
                        <button className={"banner__navTrophy din"}>
                            <img src="/trophy.svg" alt="trophy"/>
                            Join Quests
                        </button>
                        <button className={"banner__navRocket din"}>
                            <img src="/rocket.svg" alt="rocket"/>
                            Launch app
                        </button>
                    </div>
                </div>

                <div onClick={() => setIsOpen(false)} className={classNames({
                    "banner__backdrop": true,
                    "banner__backdrop--active": isOpen
                })}/>
            </header>
        </>
    )
}
