const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;

            const itemInd = state.items.findIndex(item => item.id === id);
            if (itemInd >= 0) {
                const itemInState = state.items.find(item => item.id === id);
                const newItem = {
                    ...itemInState,
                    qtty: ++itemInState.qtty
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }
            }

            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                qtty: 1
            };
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            }
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            const price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty']
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                totalPrice: state.totalPrice - price
            }
        case 'ITEM_PLUS_TO_CART':
            const idToPlusCount = action.payload;
            const itemToPlusCount = state.items.find(item => item.id === idToPlusCount);
            const newCountToPlus = {
                ...itemToPlusCount,
                qtty: ++itemToPlusCount.qtty
            }
            return {
                ...state,
                items: [
                    ...state.items,
                ],
                newCountToPlus,
                totalPrice: state.totalPrice + itemToPlusCount['price']
            }
        case 'ITEM_MINUS_TO_CART':
            const idToMinusCount = action.payload;
            const itemToMinusCount = state.items.find(item => item.id === idToMinusCount);

            if(itemToMinusCount.qtty > 1) {
                const newCountToMinus = {
                    ...itemToMinusCount,
                    qtty: --itemToMinusCount.qtty
                }
                console.log(`Больше нуля ${newCountToMinus.qtty}`);
                return {
                    ...state,
                    items: [
                        ...state.items,
                    ],
                    newCountToMinus,
                    totalPrice: state.totalPrice - itemToMinusCount['price']
                }
            }
            const newCountToMinus = {
                ...itemToMinusCount,
                qtty: itemToMinusCount.qtty
            }
            console.log(`Меньше нуля ${newCountToMinus.qtty}`);
            return {
                ...state,
                items: [
                    ...state.items,
                ],
                newCountToMinus,
                totalPrice: state.totalPrice
            }
            
        default:
            return state;
    }
}

export default reducer;