"use client"

import "./Developers.scss";
import {useEffect, useState} from "react";
import Marquee from "react-fast-marquee";

export interface DeveloperCardProps {
    idx: number,
    name: string
    slug: string
    avatar: string
    link: string
    social: {
        link: string
        image: string
    }
    children: any
}

export interface DeveloperCardsProps {
    items: DeveloperCardProps[]
}

export function DeveloperNewCard(props: DeveloperCardProps) {
    return (
        <div className="DeveloperCard">
            <div className="DeveloperCard__wrapper">
                <div className="DeveloperCardMain din">{props.children}</div>
                <div className="DeveloperCardHeader">
                    <div className="DeveloperCardHeader__info">
                        <img className="DeveloperCardHeader__avatar" src={props.avatar} alt=""/>
                        <div className="DeveloperCardHeader__data">
                            <p className="DeveloperCardHeader__name din">{props.name}</p>
                            <p className="DeveloperCardHeader__slug din">{props.slug}</p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div id={"footer-anch"}></div>
        </div>
    );
}

export default function DevelopersNew(props: DeveloperCardsProps) {
    const [speed, setSpeed] = useState<number>(250);

    useEffect(() => {
        if (window && window.innerWidth && window.innerWidth < 768) {
            setSpeed(100)
        } else {
            setSpeed(250)
        }
    }, [])

    return (
        <div className="developers">
            <div className="developers__wrapper">
                <div className="developers__header">
                    <h2 className='din'>The best devs build with Subsquid</h2>
                </div>
                <div className="developers__main">
                    <Marquee pauseOnHover={true} speed={speed}>{props.items.map((item, index) => {
                        return <DeveloperNewCard key={index} {...item}
                                                 children={item.children}/>
                    })}</Marquee>
                </div>
            </div>
        </div>
    );
}
