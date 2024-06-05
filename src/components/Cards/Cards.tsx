"use client";
import {useParallax} from "react-scroll-parallax";
import "./Cards.scss";
import {useEffect, useRef} from "react";
import MonkeyOcotoAnimation from "../../../public/lottie/MonkeyOcoto.json";
import Jellyfish0Animation from "../../../public/lottie/jellyfish_0.json";
import Jellyfish1Animation from "../../../public/lottie/jellyfish_1.json";
import Lottie from "lottie-react";

export default function Cards() {
    const jellyfishesParallax0 = useParallax({
        easing: 'easeOutQuad',
        translateX: [0, -30],
        translateY: [40, -40],
    });

    const jellyfishesParallax1 = useParallax({
        easing: 'easeOutQuad',
        translateX: [0, -20],
        translateY: [0, -20],
    });

    const jellyfishesParallax2 = useParallax({
        translateY: [0, 60],
        easing: "easeInOut"
    });

    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const addClasses = (cl: string) => {
            if (wrapperRef.current) {
                wrapperRef.current.classList.remove('c1')
                wrapperRef.current.classList.remove('c2')

                wrapperRef.current.classList.add(cl)
            }
        }

        document.addEventListener('scroll', () => {
            if (wrapperRef.current) {
                if (window.innerWidth < 768) {
                    if (window.scrollY < 800) {
                        addClasses("c1")
                    } else {
                        addClasses("c2")
                    }
                } else {
                    if (window.scrollY < 1300) {
                        addClasses("c1")
                    } else {
                        addClasses("c2")
                    }
                }
            }
        })
    }, [])

    return (
        <div className={"cards"} id="secondBlock">
            <div className="cards__blobs">
                <span ref={jellyfishesParallax0.ref} className={"cards__jellyfishes_0"}>
                    <Lottie animationData={Jellyfish0Animation}/>
                </span>

                <span ref={jellyfishesParallax1.ref} className={"cards__jellyfishes_1"}>
                    <Lottie animationData={Jellyfish1Animation}/>
                </span>

                <span ref={jellyfishesParallax2.ref} className={"cards__jellyfishes_2"}>
                    <img src="/jellyfishes_2.svg" alt=""/>
                </span>
            </div>

            <div className={"cards__wrapper"} ref={wrapperRef}>
                <div className="cards__container">
                    <span className={"cards__jellyfishes_3"}>
                        <Lottie animationData={MonkeyOcotoAnimation}/>
                    </span>
                    <div className={"cards__content cards__content--c1"}>
                        <h2 className={"cards__title"}>Every chain has data. <br/>Subsquid makes it easy to get.</h2>
                        <a href={"https://docs.subsquid.io/overview/"} target={"_blank"} className={"din__button din__button_orange cards__button"}>
                            What is Subsquid? <img src="/arrowRight.svg" alt=""/>
                        </a>
                    </div>
                    <div className={"cards__content cards__content--c2"}>

                        <h2 className={"cards__title"}>
                            Learn more about Web3’s  <br/>
                            most powerful decentralized <br/>
                            data indexing protocol.
                        </h2>
                        <a href={"https://docs.subsquid.io/subsquid-network/whitepaper/"} target={"_blank"} className={"din__button din__button_orange cards__button"}>
                            Read the Whitepaper <img src="/arrowRight.svg" alt=""/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
