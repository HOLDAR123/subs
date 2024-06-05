import React, {CSSProperties, useRef, useState} from 'react';
import "./CodeSlider.scss"
import {Swiper, SwiperSlide, SwiperClass} from 'swiper/react';
import {Pagination, Navigation, Autoplay} from "swiper/modules";
import SyntaxHighlighter from 'react-syntax-highlighter';
import classNames from "classnames";
import CodeStyle from "@/components/CodeStyle";

const ChevronSvg = <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3.5 6.25L7 9.75L10.5 6.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round"/>
</svg>;

const ChevronLeftSvg = <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>;

const ChevronRightSvg = <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>;


export interface ISlide {
    title: string,
    code: string,
    codeCollapse: string,
    link: string
    caption?: string
}

export function CodeSlider(props: { slides: ISlide[], style?: CSSProperties }) {
    const [slides, setSlides] = useState(props.slides || []);
    const [isExpanded, setIsExpanded] = useState(false);
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);

    const codeRef = useRef<HTMLDivElement | null>(null)
    const paginationRef = useRef<HTMLDivElement | null>(null)
    const nextRef = useRef<HTMLButtonElement | null>(null)
    const prevRef = useRef<HTMLButtonElement | null>(null)
    const linkRef = useRef<HTMLAnchorElement | null>(null)

    const handleClickExpand = () => {
        setIsExpanded(!isExpanded)

        setTimeout(() => {
            if (swiper)
                swiper.updateAutoHeight(200)
        }, 100)
    }

    return <>
        <div style={props.style} className={classNames({
            'code-slider': true
        })}>
            <div className={classNames({
                'code-slider__nav': true
            })}>
                <button className="code-slider__arrow" ref={prevRef}>{ChevronLeftSvg}</button>
                <button className="code-slider__arrow" ref={nextRef}>{ChevronRightSvg}</button>
            </div>

            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                onSlideChange={(s) => {
                    const el = linkRef.current as HTMLElement
                    el.setAttribute("href", s.slides[s.activeIndex].getAttribute('data-link') || "#")
                }}
                spaceBetween={20}
                navigation={{
                    enabled: true,
                    nextEl: nextRef.current as HTMLElement,
                    prevEl: prevRef.current as HTMLElement
                }}
                loop={true}
                allowTouchMove={false}
                autoplay={{delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: true}}
                pagination={{
                    clickable: true,
                    el: paginationRef.current as HTMLElement
                }}
                autoHeight={true} onSwiper={setSwiper}>
                {slides.map((slide, index) => <SwiperSlide data-link={slide.link} key={index}>
                    <p className={'code-slider__title'}>{slide.title}</p>

                    <div ref={codeRef}
                         className={classNames({
                             'code-slider__pre': true,
                             'code-slider__pre--over': !isExpanded
                         })}>

                        {isExpanded
                            ? <SyntaxHighlighter language="typescript" style={CodeStyle as any} children={slide.code}/>
                            : <SyntaxHighlighter language="typescript" style={CodeStyle as any} children={slide.codeCollapse}/>
                        }
                    </div>

                    {slide.caption ?
                        <div className={classNames({
                            'code-slider__caption': true,
                            'code-slider__caption--expand': isExpanded
                        })}>
                            <p>{slide.caption}</p></div> : undefined}
                </SwiperSlide>)}
            </Swiper>
            <div className={'code-slider__footer'}>
                <div className={''}>
                    <div className="code-slider__pagination" ref={paginationRef}></div>
                </div>

                <div className={'code-slider__stages'}>
                    <div className={classNames({
                        'code-slider__stage': true,
                        'code-slider__stage--visible': isExpanded
                    })}>
                        <a ref={linkRef} href={slides[0].link} target="_blank" className={'code-slider__link'}>Full
                            squid</a>
                        <span className="code-slider__line"></span>
                        <a href="https://docs.subsquid.io/evm-indexing/configuration/showcase/" target="_blank"
                           className={'code-slider__link'}>Showcase</a>
                        <span className="code-slider__line"></span>
                        <button onClick={handleClickExpand}
                                className={classNames({
                                    'code-slider__collapse': true,
                                    'code-slider__collapse--expand': isExpanded
                                })}>{isExpanded ? "Collapse" : "Expand"} {ChevronSvg}</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}