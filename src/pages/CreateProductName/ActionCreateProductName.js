import { SERVER_URL } from "../../config";

const postProductsToDatabase=(items)=> {
    return dispatch => {
        dispatch(postProductsPending());
        console.log('hii',{items})
        
        return fetch(SERVER_URL+items.path, { 

                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(items.post)
            }).then(r=> r.json())
              .then(json =>{
                let updatedValue = '';
                if(typeof json.total==='undefined'){
                    updatedValue="";
                    if(typeof json.message==='undefined'){
                        updatedValue += "Employee is Added Successfully"
                        dispatch(postProductsSuccess(updatedValue));

                    } 
                    else
                    {
                        updatedValue +=json.message;
                    }
                }
                else{
                updatedValue = "Errors Are "
                    for(let i=0;i<json.total;i++){
                        updatedValue +=json._embedded.errors[i].message
                        
                    }
                    dispatch(postProductsError(updatedValue));

        
            }
            dispatch(postProductsSuccess(updatedValue));
            return updatedValue

        }).catch(error =>{
        
                dispatch(postProductsError(error));
    
            })
    }
}


export const POST_PRODUCTS_PENDING = 'POST_PRODUCTS_PENDING';
export const POST_PRODUCTS_SUCCESS = 'POST_PRODUCTS_SUCCESS';
export const POST_PRODUCTS_ERROR = 'POST_PRODUCTS_ERROR';
// export const POST_PRODUCTS_TO_DATABASE_ACTION = 'POST_PRODUCTS_TO_DATABASE_ACTION';

// export function postProductsToDatabaseAction(payload) {
//     return {
//         type: POST_PRODUCTS_TO_DATABASE_ACTION,
//         payload
//     }
// }

export function postProductsPending() {
    return {
        type: POST_PRODUCTS_PENDING
    }
}

export function postProductsSuccess(send) {
    // console.log("in action"+send)
    return {
        type: POST_PRODUCTS_SUCCESS,
        payload: {send}
    }
}

export function postProductsError(error) {
    return {
        type: POST_PRODUCTS_ERROR,
        error: error
    }
}

export default postProductsToDatabase;