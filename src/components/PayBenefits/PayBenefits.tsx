import PayBenefitsItem from "./PayBenefitsItem"

import _payBenefitsMock from "@/_mock/payBenefits.mock"

import style from './PayBenefits.module.scss'
import { FadeInUp, FadeInUpFast } from "../Animation"

export default function PayBenefits() {

    const setItems = () => {
        return _payBenefitsMock.map((item, index) => {
            return <PayBenefitsItem key={index} {...item} index={index} />
        })
    }

    return (
        <section className={style["pay-benefits"]} id={"#pricing"}>
            <div className="">
                <FadeInUpFast delay={100}>
                    <h2 className="title">Pricing</h2>
                </FadeInUpFast>
                <FadeInUpFast delay={300}>
                    <p className={style["pay-benefits__subtitle"]}>Simple and transparent for projects and companies of all sizes</p>
                </FadeInUpFast>
            </div>
            <FadeInUp delay={500}>
                <div className={style["pay-benefits__wrapper"]}>
                    {setItems()}
                </div>
            </FadeInUp>
        </section>
    )
}
