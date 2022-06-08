const initialState =
{
    Title: null,
    isDone: null,
    Chips: [],
}


const Filter = (state = initialState, action) => {
    switch (action.type) {
        case "SetFilter":
            const newState = action.NewFilter;
            return newState;

        default:
            return state
    }
}
export default Filter;