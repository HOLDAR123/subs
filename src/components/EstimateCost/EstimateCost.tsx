import { useContext } from 'react'

import { TotalSumContext, ScrollElementContext, NewProcessorsContext } from '@/app/subsquid-cloud/context';

import style from './EstimateCost.module.scss'

type Props = {
    isVisible: boolean
}

export default function EstimateCost({isVisible}:Props) {

    const [totalSum, _setTotalSum] = useContext(TotalSumContext);
    const totalBlockRef = useContext(ScrollElementContext)
    const [newProcessors, _setNewProcessors] = useContext(NewProcessorsContext)

    const currentTotalPrice = () => {
        let sum = 0
        totalSum.forEach((item, _index)=>{
            sum += item.currentPrice
        })
        newProcessors.state.forEach((item, _index)=>{
            sum += item.price.value
        })
        return sum
    }

    const currentOldPrice = () => {
        let sum = 0
        totalSum.forEach((item, _index)=>{
            sum += item.price
        })
        newProcessors.state.forEach((item, _index)=>{
            sum += item.price.value
        })
        return sum
    }

    const scroll = () => {
        if (totalBlockRef?.current) {
            return window.scrollTo({
                top: totalBlockRef?.current.getBoundingClientRect().top + window.scrollY - 52 - 16,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div
            className={
                isVisible?
                style["total"]
                :`${style["total"]} ${style["total_disable"]}`
            }
            onClick={() => scroll()}
        >
            <p>Estimate cost:</p>
            <p>{currentTotalPrice() > 0 ? `$${(currentOldPrice() * 720).toFixed(2)}/mo` : 'free'}</p>
        </div>

    )
}
