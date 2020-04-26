/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up

export const signupReducer = (state = null, action) => {
    switch (action.type) {
        case 'API_ERROR':
            return {...state,...action.payload};
            break;
        case 'MAKE_REQUEST':
            return {...state,...action.payload};
            break;
        case 'SUCCESS_RESPONSE':
            return {...state,...action.payload};
            break;
    }
    return state;
}


export const getAllVendorsReducer = (state = null, action) => {
    switch (action.type) {
        case 'API_ERROR':
            return {...state,...action.payload};
            break;
        case 'MAKE_REQUEST':
            return {...state,...action.payload};
            break;
        case 'SUCCESS_RESPONSE':
            return {...state,...action.payload};
            break;
    }
    return state;
}


export const getAllCategoryReducer = (state = null, action) => {
    switch (action.type) {
        case 'API_ERROR':
            return {...state,...action.payload};
            break;
        case 'MAKE_REQUEST':
            return {...state,...action.payload};
            break;
        case 'SUCCESS_RESPONSE':
            return {...state,...action.payload};
            break;
    }
    return state;
}

export const getAllSubCategoryReducer = (state = null, action) => {
    switch (action.type) {
        case 'API_ERROR':
            return {...state,...action.payload};
            break;
        case 'MAKE_REQUEST':
            return {...state,...action.payload};
            break;
        case 'SUCCESS_RESPONSE':
            return {...state,...action.payload};
            break;
    }
    return state;
}


export const cartReducer = (state = null, action) => {
    switch (action.type) {
        case 'API_ERROR':
            return {...state,...action.payload};
            break;
        case 'REMOVE_FROM_LIST':
            return {...state,...action.payload};
            break;
        case 'CART_LIST_DATA':
            return {...state,...action.payload};
            break;
    }
    return state;
}

export const orderplacedReducer = (state = null, action) => {
    switch (action.type) {
        case 'API_ERROR':
            return {...state,...action.payload};
            break;
        case 'REMOVE_FROM_LIST':
            return {...state,...action.payload};
            break;
        case 'CART_LIST_DATA':
            return {...state,...action.payload};
            break;
    }
    return state;
}