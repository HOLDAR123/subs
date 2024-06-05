import {ReactNode} from "react";
import classNames from "classnames";
import Lottie from "lottie-react";
import arrowDownAnimationJson from "../../../public/lottie/RainbowArrowDown.json";
import arrowUpAnimationJson from "../../../public/lottie/RainbowArrowUp.json";

import style from './IndexingCard.module.scss'

export interface IndexingCardProps {
    data: {
        arrowReversed: boolean,
        icon: ReactNode,
        title: string,
        subtitle: string,
        body: {
            title: string,
            node?: ReactNode,
            cardsColumn?: boolean,
            cardsLeft?: boolean,
            cards?: Array<{
                title: string,
                image: string
            }>
        },
        items: {
            title: string,
            cardsColumn?: boolean,
            cardsLeft?: boolean,
            cards: Array<{
                title: string,
                image: string
            }>
        }
    }
}

export default function IndexingCard({data}: IndexingCardProps) {
    return (
        <div className={style.card}>
            <div className={style.card__header}>
                {data.icon}
                <p>{data.title}</p>
            </div>

            <p className={style.card__subtitle}>{data.subtitle}</p>

            <div className={style.card__body}>
                <p className={style.card__body_title}>{data.body.title}</p>
                {data.body.node && data.body.node}
                {data.body.cards && <div className={classNames({
                    [style.card__items]: true,
                    [style.card__items_column]: data.body.cardsColumn,
                    [style.card__items_left]: data.body.cardsLeft,
                })}>
                    {data.body.cards.map((item) => {
                        return (
                            <div className={style.card__item}>
                                <img src={item.image} alt=""/>
                                <p>{item.title}</p>
                            </div>
                        )
                    })}
                </div>}
            </div>

            <div className={classNames({
                [style.card__arrow]: true,
                [style.card__arrow_reverse]: data.arrowReversed
            })}>
                {data.arrowReversed ? <Lottie animationData={arrowUpAnimationJson}/> : <Lottie animationData={arrowDownAnimationJson}/>}
            </div>

            <div className={style.card__body}>
                <p className={style.card__body_title}>{data.items.title}</p>
                <div className={classNames({
                    [style.card__items]: true,
                    [style.card__items_column]: data.items.cardsColumn,
                    [style.card__items_left]: data.items.cardsLeft,
                })}>
                    {data.items.cards.map((item) => {
                        return (
                            <div className={style.card__item}>
                                <img src={item.image} alt=""/>
                                <p>{item.title}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
