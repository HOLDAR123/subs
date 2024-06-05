import { IApiCostsState, IApiCostsValueObject } from "@/_mock/apiCosts.mock";

type Props = {
    updateState: (item: IApiCostsState)=>void,
    fieldName: string,
    className: string
    item: IApiCostsValueObject,
};

export default function ApiCostsFieldRadio({item, updateState, fieldName, className }: Props) {
    
    return(
        <button
            className={className}
            onClick={() => updateState({ fieldName: fieldName, select: item.value, price: item.price })}
        >
            {item.title}
        </button>
    )

}
