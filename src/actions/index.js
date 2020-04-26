import axiosConfig from '../axiosconfig/axiosConfig';
import { add, remove,list,quantity ,destroy} from 'cart-localstorage' 

export const selectUser = (vendor) => {
    console.log("You clicked on user: ");
    return {
        type: 'USER_SELECTED',
        payload: vendor,
    }
};

export const requestPost = (user) => {
    console.log("You clicked on user: ", user.first);
    return {
        type: 'REQUEST_POSTS',
        payload: user,
    }
};


export const requestGet = (user) => {
    console.log("You clicked on user: ", user.first);
    return {
        type: 'REQUEST_GET',
        payload: user,
    }
};


export const getvendors = (productname,pincode) => {
    console.log("You clicked on getvendors: ",productname,pincode);
    let apiUrl = (productname.trim() === '' || productname === null || productname === undefined)?'vendors/'+pincode:'product?name='+productname+'&zipcode='+pincode;
    return (dispatch, getState) => {
        // dispatch(fetchvendorRequest());
        
        return axiosConfig.get(apiUrl)
          .then( (response)=> {
            const vendors = response.data;
            console.log("vendors34====>",vendors);
            dispatch(vendorlist(vendors));
          })
          .catch(function (error) {
            dispatch(requestError(error.message));
          });
    }
};

export const placetheorder = (formdata,cartdata) => {
    console.log("You clicked on placetheorder: ",formdata,cartdata);
    let itemVO = [...cartdata];
    let reqparams = {...formdata,itemVO:itemVO};
    return (dispatch, getState) => {
        dispatch(makeRequest());
        return axiosConfig.post('orderSubmit/',reqparams)
          .then( (response)=> {
            dispatch(clearthecart());
            dispatch(orderPlacesuccessResponse(response.data));
            alert(response.data.message);
          })
          .catch(function (error) {
            dispatch(requestError(error.message));
          });
    }
};

export const getcartlist = (cartdata) => {
    // add(cartdata, 1)
    let cartdatalist = list();
    return {
        type: 'CART_LIST_DATA',
        payload: {"message":"Product Added in cart successfully.",cartlist:cartdatalist},
    }
};

export const removefromcart = (id) => {
    console.log("before removing item cart list id======>",id);
    console.log("before removing item cart list======>",list());
    remove(id);
    let cartdatalist = list();
    console.log("before removing item cart list======>",list());
    return {
        type: 'CART_LIST_DATA',
        payload: {"message":"Product removed from cart successfully.",cartlist:cartdatalist},
    }
};

export const updatequantity = (id,previousquantity,totalquantity) => {
    let tremovepreviousquantity = ((previousquantity)-(totalquantity));
    // quantity(id,-1)
    quantity(id,-(tremovepreviousquantity))
    let cartdatalist = list();
    console.log("before removing item cart list======>",list());
    return {
        type: 'CART_LIST_DATA',
        payload: {"message":"Product removed from cart successfully.",cartlist:cartdatalist},
    }
};

export const clearthecart = ()=>{
    destroy()
    let cartdatalist = list();
    console.log("cartdatalist====>",cartdatalist);
    return {
        type: 'CART_LIST_DATA',
        payload: {"message":"Cart cleared successfully.",cartlist:cartdatalist},
    }
}

export const makesignuprequest = (reqparams) => {
    console.log("You clicked on getvendors: ",reqparams);
   
    return (dispatch, getState) => {
        dispatch(makeRequest());
        return axiosConfig.post('vendors/',{...reqparams})
          .then( (response)=> {
            dispatch(successResponse());
          })
          .catch(function (error) {
            dispatch(requestError(error.message));
          });
    }
};

export const getAllvendors = (prams) => {
    console.log("You clicked on getvendors: ",prams);
    return (dispatch, getState) => {
        // dispatch(makeRequest());
        return axiosConfig.get('vendors/')
          .then( (response)=> {
            dispatch(vendorListSuccessResponse(response.data));
          })
          .catch(function (error) {
            dispatch(requestError(error.message));
          });
    }
};

export const getExistingSubCategory = (prams) => {
    console.log("You clicked on getExistingSubCategory: ",prams);
    return (dispatch, getState) => {
        dispatch(makeRequest());
        return axiosConfig.get('category/vendor/3')
          .then( (response)=> {
            dispatch(categorySuccessResponse(response.data));
          })
          .catch(function (error) {
            dispatch(requestError(error.message));
          });
    }
};

export const getExistingCategory = (prams) => {
    console.log("You clicked on getExistingCategory: ",prams);
    return (dispatch, getState) => {
        dispatch(makeRequest());
        return axiosConfig.get('category/vendor/3')
          .then( (response)=> {
            dispatch(subCategorySuccessResponse(response.data));
          })
          .catch(function (error) {
            dispatch(requestError(error.message));
          });
    }
};

const requestError = (error) => {
    return {
        type: 'API_ERROR',
        payload: {"message":error,loading:false},
    }
};

const vendorlist = (response) => {
    return {
        type: 'VENDOR_LIST',
        payload: {vendors:[...response]},
    }
};

const makeRequest = () => {
    return {
        type: 'MAKE_REQUEST',
        payload: {"message":"",loading:true},
    }
};

const orderPlacesuccessResponse = (data) => {
    return {
        type: 'SUCCESS_RESPONSE',
        payload: {loading:false,message:data.message},
    }
};

const successResponse = () => {
    return {
        type: 'SUCCESS_RESPONSE',
        payload: {loading:false,message:"Vendor registered successfully."},
    }
};

const vendorListSuccessResponse = (data) => {
    return {
        type: 'SUCCESS_RESPONSE',
        payload: {...data},
    }
};

const categorySuccessResponse = (data) => {
    return {
        type: 'SUCCESS_RESPONSE',
        payload: {...data},
    }
};

const subCategorySuccessResponse = (data) => {
    return {
        type: 'SUCCESS_RESPONSE',
        payload: {...data},
    }
};

export const makelogoutrequest = () => {
    let loginstatus = (localStorage.getItem('user') != null)?true:false;
    return {
        type: 'LOGOUT',
        payload: {islogin:loginstatus},
    }
};

export const makeloginrequest = () => {
    let loginstatus = (localStorage.getItem('user') != null)?true:false;
    return {
        type: 'LOGIN',
        payload: {islogin:loginstatus},
    }
};

// dispatch(requestPosts());
export const selectUserbythunk = (user) => {
    console.log("You clicked on user: ", user.first);
    return function (dispatch) {
        axiosConfig.get('users')
        .then(function (response) {
          // handle success
          console.log("adarsh==================>1",response);
          dispatch(selectUser(user));
        })
        .catch(function (error) {
          // handle error
          dispatch(requestError());
        })
        .finally(function () {
            //dispatch(selectUser());
        });
      };
};