"use client"

import './Footer.scss'
import React, {useRef, useState} from "react";
import classNames from "classnames";

const Chevron = <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
        d="M12.7924 15.9706C12.3921 16.4906 11.6079 16.4906 11.2076 15.9706L8.04322 11.86C7.53703 11.2024 8.00579 10.25 8.83563 10.25L15.1644 10.25C15.9942 10.25 16.463 11.2024 15.9568 11.86L12.7924 15.9706Z"
        fill="currentColor"/>
</svg>

export interface INavItem {
    text: string,
    link: string,
    target: string
}

export interface INav {
    title: string
    items: INavItem[],
    active?: boolean
}

export default function Footer() {
    const emailRef = useRef(null)
    const [status, setStatus] = useState(0)

    const [navs, setNavs] = useState<INav[]>([
        {
            title: "Resources",
            items: [
                {link: "https://subsquid-cloud.betteruptime.com/", text: "Subsquid Cloud Status", target: '_blank'},
                {link: "https://docs.subsquid.io/", text: "Documentation", target: '_blank'},
                {link: "https://blog.subsquid.io/", text: "Blog", target: '_blank'},
                {link: "/press-kit", text: "Press kit", target: '_self'},
            ]
        },
        {
            title: "Follow us",
            items: [
                {link: "https://twitter.com/subsquid", text: "Twitter", target: '_blank'},
                {link: "https://discord.com/invite/subsquid", text: "Discord", target: '_blank'},
                {link: "https://www.youtube.com/@subsquid", text: "YouTube", target: '_blank'},
                {link: "https://github.com/subsquid", text: "GitHub", target: '_blank'},
            ]
        },
        {
            title: "Legal",
            items: [
                {link: "/imprint", text: "Imprint & Privacy", target: '_self'},
            ]
        },
    ])

    function openDropdown(el: HTMLElement, nav: INav, index: number) {
        if (window.innerWidth < 1024) {
            const itemsEl: HTMLElement | null = el.querySelector('.footer-item__items')

            if (itemsEl) {
                setNavs((prevState) => (prevState.map((_nav, _index) => ({
                    title: _nav.title,
                    items: _nav.items,
                    active: (index === _index) ? !_nav.active : _nav.active
                }))))

                if (nav.active) {
                    itemsEl.style.height = 0 + "px"
                } else {
                    itemsEl.style.height = itemsEl.scrollHeight + "px"
                }
            }
        }
    }

    async function sumbitHandle(e: any) {
        e.preventDefault()

        fetch('https://subsquid.us6.list-manage.com/subscribe/post?u=55f0a830c64142a7be6f40485&amp;id=c323dcc22d&amp;f_id=00b82fe3f0', {
            mode: 'no-cors',
            body: new FormData(e.currentTarget),
            method: 'POST'
        }).then(response => {
            setStatus(1)

            setTimeout(() => {
                setStatus(0)
            }, 5000)
        }).catch((e) => {
            console.error(e)
            setStatus(2)

            setTimeout(() => {
                setStatus(0)
            }, 5000)
        })

        console.log(new FormData(e.currentTarget))
    }

    return (
       <>
           <footer className={'footer'}>
               <div className="container">
                   <div className="footer__wrapper">
                       <h2>Get updates</h2>
                       <form className="footer-form" onSubmit={sumbitHandle}>
                           <input type="email" name="EMAIL" required placeholder="Your email" ref={emailRef}/>
                           <button type="submit">Submit</button>
                           {status !== 0 ? <span className={classNames({
                               'footer-form__alert': true,
                               'footer-form__alert--error': status === 2,
                               'footer-form__alert--success': status === 1,
                           })}>{status === 2 ? 'Oops... Something went wrong, try again later' : 'You have successfully subscribed'}</span> : undefined}
                       </form>

                       <div className="footer__data">
                           <div className="footer__items">
                               {navs.map((nav, index) => (
                                   <div className={classNames({
                                       'footer-item': true,
                                       'footer-item--active': nav.active
                                   })} key={index} onClick={(e) => openDropdown(e.currentTarget, nav, index)}>
                                       <div className="footer-item__title"><span>{nav.title}</span> {Chevron}</div>
                                       <div className="footer-item__items">
                                           {nav.items.map((item, _index) => <a key={_index}
                                                                               href={item.link}
                                                                               target={item.target}>{item.text}</a>) || []}
                                       </div>
                                   </div>
                               ))}
                           </div>
                           <p className="footer__caption">Subsquid Labs GmbH / Zug, Switzerland</p>
                       </div>
                   </div>
                   <div className="footer__logos">
                       <div className='footer__subsquid'>
                           <img src="/logo.png" alt=""/>
                           <p>SUBSQUID</p>
                       </div>
                       <div>
                           <div className="footer__logo">
                               <img className="footer__item-powered" src="/powered.svg" alt=""/>
                               <div><img className="footer__item-polygon" src="/Polygon.svg" alt=""/></div>
                           </div>
                           <div><img className="footer__item-gcloud" src="/GCloud.svg" alt=""/></div>
                           <div><img className="footer__item-substrabe" src="/Substrabe.svg" alt=""/></div>
                       </div>
                   </div>
               </div>
           </footer></>
    )
}
