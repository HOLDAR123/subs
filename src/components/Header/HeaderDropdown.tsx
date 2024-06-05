'use client'

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useWindowWidth } from "@react-hook/window-size";

import { useOutsideClick } from "@/hooks/useOutsideClick";

import { IHeaderList } from "@/_mock/header.mock";

import img_arrow_mobile from '@/../public/headerListIcons/arrow_mobile.svg'
import img_arrow_mobile_hover from '@/../public/headerListIcons/arrow_mobile_hover.svg'
import img_arrow from '@/../public/headerListIcons/arrow.svg'
import img_arrow_hover from '@/../public/headerListIcons/arrow_hover.svg'

import style from './HeaderDropdown.module.scss'

export default function HeaderDropdown({ items, title }: IHeaderList) {

    const windowWidth = useWindowWidth()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const dropdownRef = useOutsideClick(() => setIsOpen(false))
    const navRef = useRef<HTMLElement>(null)

    const setItems = () => {
        return items.map((target, index) => {
            return (
                <a
                    key={index}
                    className={style.dropdown__list__link}
                    href={target.href.value}
                    target={target.href.type === 'remote' ? '_blank' : '_self'}
                    rel={target.href.type === 'remote' ? 'noopener noreferrer' : undefined}
                >
                    <div className={style.dropdown__list__link__images}>
                        <Image {...target.img} alt={target.href.value} />
                        <Image {...target.img_hover} alt={target.href.value} />
                    </div>
                    <p>{target.href.title}</p>
                </a>
            )
        })
    }

    useEffect(() => {
        if (navRef.current) {
            let maxWidth = 0
            if (isOpen && navRef.current.parentElement) {
                navRef.current.parentElement.style.height = `${navRef.current.getBoundingClientRect().height + 5}px`
            }
            else if (!isOpen && navRef.current.parentElement) {
                navRef.current.parentElement.style.height = '0px'
            }
            if (navRef.current.parentElement) {
                const links = navRef.current.querySelectorAll('a')
                links.forEach(link => {
                    const width = link.getBoundingClientRect().width
                    if (width > maxWidth) {
                        maxWidth = width
                    }
                })
                if (windowWidth > 767.999) {
                    navRef.current.parentElement.style.width = `${maxWidth}px`
                }
            }
            
        }
    }, [navRef, isOpen])

    return (
        <div ref={dropdownRef} className={style.dropdown} id={title + 1}>
            <div className={style.dropdown__top} onClick={() => { setIsOpen(!isOpen) }}>
                <p>{title}</p>
                <div className={style.dropdown__top__arrow}>
                    {windowWidth < 767.999 ? (
                        <>
                            <Image {...img_arrow_mobile} alt={isOpen ? 'close dropdown' : 'open dropdown'} />
                            <Image {...img_arrow_mobile_hover} alt={isOpen ? 'close dropdown' : 'open dropdown'} />
                        </>
                    ) : (
                        <>
                            <Image {...img_arrow} alt={isOpen ? 'close dropdown' : 'open dropdown'} />
                            <Image {...img_arrow_hover} alt={isOpen ? 'close dropdown' : 'open dropdown'} />
                        </>
                    )}
                </div>
            </div>
            <div className={style.dropdown__list__wrapper}>
                <nav ref={navRef} className={style.dropdown__list}>{setItems()}</nav>
            </div>
        </div>
    );
}
