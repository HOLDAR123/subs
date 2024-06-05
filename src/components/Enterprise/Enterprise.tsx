"use client"

import './Enterprise.scss'
import Tabs from "@/components/Tabs/Tabs";
import {CodeSlider} from "@/components/CodeSlider/CodeSlider";
import _enterpriseMock from "../../_mock/enterprise.mock";
import {useEffect, useRef, useState} from "react";
import {FadeIn, FadeInUp, SlideInLeft, SlideInRight} from "@/components/Animation";
import {SwitchTransition, CSSTransition} from "react-transition-group";

export default function Enterprise() {
    const [currentIndex, setCurrentIndex] = useState(true)

    const sliderRef = useRef(null);
    const picRef = useRef(null);
    const nodeRef = currentIndex ? sliderRef : picRef;

    useEffect(() => {
        document.addEventListener('onTabChange', ((e: CustomEvent<number>) => {
            setCurrentIndex(e.detail === 0)
        }) as EventListener)
    }, [])

    return (
        <div className="enterprise">
            <div className="enterprise__wrapper">
                <FadeInUp delay={100}>
                    <div className="enterprise__header">
                        <h2>Enterprise-ready, dev-friendly</h2>
                        <p className="subtitle">Open-source toolkit and one-line cloud deployment</p>
                    </div>
                </FadeInUp>
                <div className="enterprise__items">
                    <SlideInLeft className="enterprise__tabs" delay={200}>
                        <Tabs/>
                    </SlideInLeft>

                    <SlideInRight className="enterprise__component" delay={200}>
                        <SwitchTransition mode="out-in">
                            <CSSTransition key={currentIndex as any} nodeRef={nodeRef}
                                           addEndListener={(done: any) => {
                                               if (nodeRef.current) {
                                                   const el = nodeRef.current as HTMLDivElement
                                                   el.addEventListener("transitionend", done, false);
                                               }
                                           }}
                                           classNames="fade"
                            >
                                <div ref={nodeRef}>
                                    {currentIndex ? <CodeSlider slides={_enterpriseMock}/> :
                                        <picture>
                                            <source media="(max-width: 1280px)" srcSet="/enterprise-1024.png"/>
                                            <source media="(max-width: 1024px)" srcSet="/enterprise-768.png"/>
                                            <source media="(max-width: 768px)" srcSet="/enterprise-350.png"/>
                                            <img src="/enterprise-1280.png" alt="" className="enterprise__image"/>
                                        </picture>}
                                </div>
                            </CSSTransition>
                        </SwitchTransition>
                    </SlideInRight>

                    <SlideInLeft className="enterprise__buttons" delay={400}>
                        <div className="enterprise__buttons-wrap">
                            <a href="https://docs.subsquid.io/" className="btn btn--outline" target="_blank">Docs</a>
                            <a href="https://app.subsquid.io/" className="btn btn--primary" target="_blank">Launch
                                app</a>
                        </div>
                    </SlideInLeft>
                </div>
            </div>
        </div>
    )
}
