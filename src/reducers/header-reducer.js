const initialState = {islogin:(localStorage.getItem('user') != null)?true:false};
export const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return {...state,...action.payload};
            break;
    }
    return state;
}