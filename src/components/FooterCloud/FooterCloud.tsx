"use client"

import React, {useEffect, useRef, useState} from "react";
import TabFooter from "@/components/TabFooter/TabFooter";
import './FooterCloud.scss'
import classNames from "classnames";

interface FooterCloudProps {
    isLanding?: boolean
}

export default function FooterCloud({isLanding}: FooterCloudProps) {

    const emailRef = useRef(null)
    const [status, setStatus] = useState(0)

    const titleData = [
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
            title: "Legal",
            items: [
                {link: "/imprint", text: "Imprint & Privacy", target: '_self'},
            ]
        },
    ]

    const iconsData = [
        {link: "https://twitter.com/subsquid", img: "/twitterNav.svg ", target: '_blank'},
        {link: "https://discord.com/invite/subsquid", img: "/discordNav.svg", target: '_blank'},
        {link: "https://www.youtube.com/@subsquid", img: "/youtubeNew.svg", target: '_blank'},
        {link: "https://github.com/subsquid", img: "/githubNew.svg", target: '_blank'},
    ]

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
    }

    const [shouldShowFooter, setShouldShowFooter] = useState(true);

    useEffect(() => {
        console.log(shouldShowFooter)
        const handleResize = () => {
            if (window.innerWidth >= 550) {
                setShouldShowFooter(true);
            } else {
                setShouldShowFooter(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [shouldShowFooter]);


    return (
        <>
            {!isLanding && <TabFooter/>}
            <footer className="footerCloud">
                <div className="container-new">
                    <div className="footerCloud__content">
                        <div className="footerCloud__content__column">
                            <div className={`footerCloud__content__column__heading secondClassName`}>
                                <img src='/logo.svg'/>
                            </div>

                            <div className="footerCloud__content__title">
                                Subsquid Labs GmbH / Zug, Switzerland
                            </div>
                            <div className="case">
                                <div className="footerCloud__content__column__heading">
                                    Powered by
                                </div>
                                <div className="footerCloud__content__column__socialMedias">
                                    <img className="footer__item-polygon" src="/Polygon.svg" alt=""/>
                                    <img className="footer__item-gcloud" src="/GCloud.svg" alt=""/>
                                    <img className="footer__item-substrabe" src="/Substrabe.svg" alt=""/>
                                </div>
                            </div>
                        </div>
                        {shouldShowFooter ?
                            <>
                                {titleData.map((data) => (
                                    <div className="footerCloud__content__column">
                                        <div className="footerCloud__content__column__heading">
                                            {data.title}
                                        </div>
                                        {data.items.map((item) => (
                                            <>
                                                <a target={item.target} href={item.link}
                                                   className="footerCloud__content__column__title">
                                                    {item.text}
                                                </a>
                                            </>
                                        ))
                                        }
                                    </div>
                                ))
                                }</> :

                            <div className="wrapper">

                                {titleData.map((data) => (
                                    <div className="footerCloud__content__column">
                                        <div className="footerCloud__content__column__heading">
                                            {data.title}
                                        </div>
                                        {data.items.map((item) => (
                                            <>
                                                <a target={item.target} href={item.link}
                                                   className="footerCloud__content__column__title">
                                                    {item.text}
                                                </a>
                                            </>
                                        ))
                                        }
                                    </div>
                                ))
                                }
                            </div>
                        }
                        <div className="footerCloud__content__column">
                            <div className="footerCloud__content__column__heading">
                                Follow us
                            </div>
                            <div className="footerCloud__content__column__icons">
                                {iconsData.map((item) => (
                                    <a href={item.link} target={item.target}>
                                        <img src={item.img} alt="icon"/>
                                    </a>
                                ))
                                }
                            </div>
                            <div className="footerCloud__content__column__mail">
                                <div className="footerCloud__content__column__heading">
                                    Get Updates
                                </div>
                                <form className="footerCloud__content__column__mail__form" onSubmit={sumbitHandle}>
                                    <input type="email" name="EMAIL" required placeholder="Your email" ref={emailRef}/>
                                    <button type="submit">Submit</button>
                                    {status !== 0 ? <span className={classNames({
                                        'footer-form__alert': true,
                                        'footer-form__alert--error': status === 2,
                                        'footer-form__alert--success': status === 1,
                                    })}>{status === 2 ? 'Oops... Something went wrong, try again later' : 'You have successfully subscribed'}</span> : undefined}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
