import { HttpAuth } from "../../config/Http";

export const actionTypes = {
    CHANGE: 'CHANGE_FOLLOWS',
    INDEX: 'INDEX_FOLLOW',
    STORE: 'STORE_FOLLOW',
    SHOW: 'SHOW_FOLLOW',
    DELETE: 'DELETE_FOLLOW'
}

export const change = (payload) => ({
  type: actionTypes.CHANGE,
  payload,
});

const indexResponse = (payload) => ({
  type: actionTypes.INDEX,
  payload,
});

export const followsIndex = query => dispatch => {
    HttpAuth.get('network/users?'+new URLSearchParams(query)).then(res => {
        if(typeof res !== 'undefined'){
            dispatch(indexResponse(res.data))
        }
    })
}

