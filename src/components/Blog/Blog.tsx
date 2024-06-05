"use client"

import './Blog.scss'
import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide, SwiperClass} from 'swiper/react';
import {Pagination} from "swiper/modules";
import {FadeInUp} from "@/components/Animation";

export interface BlogProps {
    slides: ISlideBlog[]
}

export interface ISlideBlog {
    title: string
    text: string
    shortText: string
    caption: string
    link: string,
}

export default function Blog(props: BlogProps) {
    const [slides, setSlides] = useState<ISlideBlog[]>(props.slides || [])
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        if(window.innerWidth < 768) setIsMobile(true)
    }, [])

    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const paginationRef = useRef<HTMLDivElement | null>(null)

    return (
        <div className={'blog'}>
            <div className="blog__wrapper">
                <FadeInUp delay={100}>
                    <div className="blog__header">
                        <h2>Read the blog</h2>
                        <p className={'subtitle'}>Project updates, industry insights, and much more</p>
                    </div>
                </FadeInUp>

                <FadeInUp delay={100}>
                    <div className="blog__main">
                        <Swiper
                            onInit={(s) => {
                                setTimeout(() => { //Fix dots margin
                                    s.update()
                                    s.updateSize()
                                    s.updateProgress()
                                    s.updateAutoHeight()
                                }, 300)
                            }}
                            modules={[Pagination]}
                            spaceBetween={32}
                            pagination={{
                                clickable: true,
                                el: paginationRef.current as HTMLElement
                            }}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2,
                                    slidesPerGroup: 2,
                                    spaceBetween: 32
                                },
                                1024: {
                                    slidesPerView: 3,
                                    slidesPerGroup: 3,
                                    spaceBetween: 24
                                },
                                1280: {
                                    slidesPerView: 3,
                                    slidesPerGroup: 3,
                                    spaceBetween: 32
                                }
                            }}
                            onSwiper={setSwiper} watchSlidesProgress={true}>
                            {slides.map((slide, index) => <SwiperSlide className="blog-item" key={index}>
                                <div className="blog-item__wrapper">
                                    <a className="blog-item__link" href={slide.link} target="_blank"></a>
                                    <div className="blog-item__header">
                                        <h3>{slide.title}</h3>
                                    </div>
                                    <div className="blog-item__main">
                                        <p className="blog-item__text">{isMobile ? slide.shortText : slide.text}</p>
                                        <p>{slide.caption}</p>
                                    </div>
                                </div>
                            </SwiperSlide>)}
                        </Swiper>
                    </div>
                </FadeInUp>
            </div>

            <div className="blog__pagination" ref={paginationRef}></div>
        </div>
    )
}
