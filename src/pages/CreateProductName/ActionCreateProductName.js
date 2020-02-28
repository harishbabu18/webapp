import { SERVER_URL } from "../../config";

const postProductsToDatabase=(path,post)=> {
    return dispatch => {
        dispatch(postProductsPending());
        console.log('hii',{path})
        // const url = SERVER_URL+'/contact'
        // return fetch(SERVER_URL+path)
        // .then(res => res.json())
        // .then(json => {
        //     if(json.status === 422) {
        //         dispatch(postProductsError);
        //     }
        //     const send = JSON.stringify(json)

        //     // console.log("in fetch "+send)
        //     dispatch(postProductsSuccess(send.id + "is Added Successfully"));
        //     return send;
          
        // })
        // .catch(error => {
        //     dispatch(fetchProductsError(error));
        // })
        return fetch(SERVER_URL+path, { 

                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
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
        
                dispatch(fetchProductsError(error));
    
            })
    }
}


export const POST_PRODUCTS_PENDING = 'POST_PRODUCTS_PENDING';
export const POST_PRODUCTS_SUCCESS = 'POST_PRODUCTS_SUCCESS';
export const POST_PRODUCTS_ERROR = 'POST_PRODUCTS_ERROR';
export const POST_PRODUCTS_TO_DATABASE = 'POST_PRODUCTS_TO_DATABASE';

export function postProductsToDatabase(payload) {
    return {
        type: POST_PRODUCTS_TO_DATABASE,
        payload
    }
}

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

export default postProducts;