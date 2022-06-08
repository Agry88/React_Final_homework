export const SetCard = (NewCard) =>{
    return{
        type: 'SetCard',
        newCards:NewCard,
    };
}

export const SetFilter = (NewFilter) =>{
    return{
        type: 'SetFilter',
        NewFilter:NewFilter,
    };
}