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


// export const fetchDetails = (project) => {
//     // console.log("in action"+send)
//     return (dispatch,getState) => { 
//              // dispatch(fetchProductsPending());
//              console.log('hii',{project})
//              // const url = SERVER_URL+'/contact'
//              fetch(SERVER_URL+'/'+project)
//              .then(res => res.json())
//              .then(json => {
//                  if(json.status === 422) {
//                      dispatch(fetchProductsError);
//                  }
//                  const send = JSON.stringify(json)
     
//                  // console.log("in fetch "+send)
//                  dispatch(fetchProductsSuccess(send,project));
//                 //  return send;
               
//              })
//              .catch(error => {
//                  dispatch(fetchProductsError(error));
//              })
    

//     }
// }

export const fetchDetails = (props) => {
    return dispatch => {
        dispatch(fetchProductsPending());
        console.log('hii',{props})
        // const url = SERVER_URL+'/contact'
        return fetch(SERVER_URL+'/'+props)
        .then(res => res.json())
        .then(json => {
            if(json.status === 422) {
                dispatch(fetchProductsError);
            }
            const send = JSON.stringify(json)

            // console.log("in fetch "+send)
            dispatch(fetchProductsSuccess(send,props));
            return send;
          
        })
        .catch(error => {
            dispatch(fetchProductsError(error));
        })
    }
}


export const POST_PRODUCTS_PENDING = 'POST_PRODUCTS_PENDING';
export const POST_PRODUCTS_SUCCESS = 'POST_PRODUCTS_SUCCESS';
export const POST_PRODUCTS_ERROR = 'POST_PRODUCTS_ERROR';
export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';


export function fetchProductsPending() {
    return {
        type: FETCH_PRODUCTS_PENDING
    }
}

export function fetchProductsSuccess(send,props) {
    // console.log("in action"+send)
    return {     
        type: FETCH_PRODUCTS_SUCCESS,
        payload: {send, props}

    }
}

export function fetchProductsError(error) {
    return {
        type: FETCH_PRODUCTS_ERROR,
        error: error
    }
}

export function postProductsPending() {
    return {
        type: POST_PRODUCTS_PENDING
    }
}

export function postProductsSuccess(send) {
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