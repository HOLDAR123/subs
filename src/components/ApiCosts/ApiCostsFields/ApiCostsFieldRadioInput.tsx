import { IApiCostsRadioInput, IApiCostsState } from "@/_mock/apiCosts.mock";

import style from '../ApiCosts.module.scss'

type Props = {
    updateState: ( item: IApiCostsState)=>void,
    field: IApiCostsRadioInput,
    setClassName: (key: number) => string,
    value: string,
    isActive: boolean
};

export default function ApiCostsFieldRadioInput({updateState, field, setClassName, value, isActive }: Props) {

    const updateObj = (item: number | string): IApiCostsState => {
        return {
            price: {
                type: field.price.type,
                value: field.price.value
            },
            fieldName: field.name, 
            select: item.toString(),
            isActive: isActive,
        }
    }

    const setItems = field.values.map((item, index) => {

        return (
            <button
                key={index}
                className={setClassName(index)}
                onClick={() => updateState(updateObj(item))}
            >
                {item}
            </button>

        );
    });

    const blurHandler = () => {
        if (field.limit) {
            if (Number(value) > field?.limit) {
                return updateState(updateObj(field.limit.toString()))
            }
            else if (Number(value) <= 0) {
                return updateState(updateObj(1))
            }
        }
        else return null
    }
    
    return(
        <>
            <div className={style["api-costs__list-item__fields-wrapper"]}>
                {setItems}
            </div>
            <input
                type="number"
                min={1}
                placeholder='Your value'
                value={value}
                onChange={(e) => updateState(updateObj(e.target.value))}
                onBlur={blurHandler}
            />
        </>
    )

}