/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up
export default function (state = null, action) {
    switch (action.type) {
        case 'USER_SELECTED':
            return action.payload;
            break;
        case 'API_ERROR':
            return action.payload;
            break;
        case 'VENDOR_LIST':
            let vendorlist = action.payload.vendors;
            return {...state,vendorlist};
            break;
        case 'FETCH_VENDOR_REQUEST':
            return action.payload;
            break;
    }
    return state;
}