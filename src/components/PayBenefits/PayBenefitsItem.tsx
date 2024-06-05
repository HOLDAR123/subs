import {IPayBenefit} from '@/_mock/payBenefits.mock'

import style from './PayBenefits.module.scss'
import {Fragment} from 'react'

interface Props extends IPayBenefit {
    index: number
}

export default function PayBenefitsItem({title, subtitle, items, button, description, index}: Props) {

    const setItems = () => {
        return items.map((item, index) => {
            return (
                <Fragment key={index}>
                    <li className={style["pay-benefits__item__list-item"]}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M2.25 12.5C2.25 7.11522 6.61522 2.75 12 2.75C17.3848 2.75 21.75 7.11522 21.75 12.5C21.75 17.8848 17.3848 22.25 12 22.25C6.61522 22.25 2.25 17.8848 2.25 12.5ZM15.6103 10.6859C15.8511 10.3489 15.773 9.88046 15.4359 9.6397C15.0989 9.39894 14.6305 9.47701 14.3897 9.81407L11.1543 14.3436L9.53033 12.7197C9.23744 12.4268 8.76256 12.4268 8.46967 12.7197C8.17678 13.0126 8.17678 13.4874 8.46967 13.7803L10.7197 16.0303C10.8756 16.1862 11.0921 16.2656 11.3119 16.2474C11.5316 16.2293 11.7322 16.1153 11.8603 15.9359L15.6103 10.6859Z"
                                  fill="#EC6A3B"/>
                        </svg>

                        <p>{item}</p>
                    </li>
                </Fragment>
            )
        })
    }

    return (
        <div className={style["pay-benefits__item"]}>
            <div className={style["pay-benefits__item__wrapper"]}>
                <h3 className="title">{title}</h3>
                {subtitle && (
                    <p className={style["pay-benefits__item__subtitle"]}>{subtitle}</p>
                )}
                <p className={style["pay-benefits__item__description"]}>{description}</p>
            </div>
            <ul className={style["pay-benefits__item__list"]}>
                {setItems()}
            </ul>
            <button className={style["pay-benefits__item__button"]}>
                <a href={button.href} target="_blank" rel="noopener noreferrer">
                    {button.title}
                </a>
            </button>
            {index === 1 && (
                <>
                    <div className={style["pay-benefits__item_blue"]}></div>
                    <div className={style["pay-benefits__item_orange"]}></div>
                </>
            )}
        </div>
    )
}
