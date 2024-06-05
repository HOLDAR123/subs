"use client"

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Link from 'next/link';
import Image from 'next/image';

import { HeaderList } from '@/_mock/header.mock';

import GitHub from "@/components/GitHub/GitHub";
import HeaderDropdown from './HeaderDropdown';

import telegram from '@/../public/social/telegram.svg'
import twitter from '@/../public/social/twitter.svg'
import discord from '@/../public/social/discord.svg'

import { useWindowWidth } from "@react-hook/window-size";

import './HeaderNew.scss'

type Props = {
    // setHeaderWidth: Dispatch<SetStateAction<number>>
}

export default function HeaderNew({ }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const headerRef = useRef<HTMLElement>(null)
    const headerTopRef = useRef<HTMLDivElement>(null)

    const windowWidth = useWindowWidth()

    const setTopSpace = () => {
        const isSafari = typeof window !== 'undefined' ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false;
        if (headerRef.current && headerTopRef.current) {
            if (isSafari) {
                return `${headerRef.current?.offsetHeight}px`
            }
            else return `${headerRef.current?.offsetHeight - headerTopRef.current?.offsetHeight}px`
        }
    }

    const setHeaderDropdown = () => {
        return HeaderList.map((item, index) => {
            return (
                <div className="nav__item">
                    <HeaderDropdown {...item} />
                </div>
            )
        })
    }

    // useEffect(() => {
    //     if (windowWidth > 767.999) {
    //         setIsOpen(false)
    //     }
    // }, [windowWidth])

    return (
        <header ref={headerRef} className={classNames({
            'header': true,
            'header--open': isOpen
        })}>
            <div className="header__inner">
                <div className="container">
                    <div className="header__wrapper">
                        <div>
                            <Link href="/"><img src="/logo.png" alt="" className="header__logo" /></Link>
                        </div>
                        <div>
                            <button className={classNames({
                                'hamburger': true,
                                'hamburger--active': isOpen
                            })} onClick={() => setIsOpen(!isOpen)}>
                                <span></span><span></span><span></span>
                            </button>
                            <nav
                                style={{ top: setTopSpace(), transition: '0.5s all' }}
                                className={classNames({
                                    'nav': true,
                                    'nav--active': isOpen
                                }
                                )}>
                                <div className="nav__section">
                                    {setHeaderDropdown()}
                                    <a href="https://coinlist.co/subsquid" className="nav__item" target="_blank">Token</a>
                                </div>
                                {windowWidth < 1023.999 && (
                                    <div className="nav__section">
                                        <div className="nav__social">
                                            <a href="https://discord.com/invite/subsquid" target="_blank" rel="noopener noreferrer">
                                                <Image {...discord} alt=''/>
                                            </a>
                                            <a href="https://twitter.com/subsquid" target="_blank" rel="noopener noreferrer">
                                                <Image {...twitter} alt=''/>
                                            </a>
                                            <a href="https://t.me/subsquid" target="_blank" rel="noopener noreferrer">
                                                <Image {...telegram} alt=''/>
                                            </a>
                                        </div>
                                    </div>
                                )}

                                
                                <div className="nav__section">
                                    {windowWidth > 1023.999 && (
                                        <GitHub username="subsquid" reponame="squid-sdk" />
                                    )}
                                    {windowWidth > 1023.999 && (
                                        <div className="nav__social">
                                            <a href="https://discord.com/invite/subsquid" target="_blank" rel="noopener noreferrer">
                                                <Image {...discord} alt=''/>
                                            </a>
                                            <a href="https://twitter.com/subsquid" target="_blank" rel="noopener noreferrer">
                                                <Image {...twitter} alt=''/>
                                            </a>
                                            <a href="https://t.me/subsquid" target="_blank" rel="noopener noreferrer">
                                                <Image {...telegram} alt=''/>
                                            </a>
                                        </div>
                                    )}
                                    <a href="https://app.subsquid.io/" className="btn btn--primary" target="_blank">Launch app</a>
                                    {windowWidth < 1023.999 && (
                                        <GitHub username="subsquid" reponame="squid-sdk" />
                                    )}
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
