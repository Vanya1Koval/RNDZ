import {
    FETCHED, PRESSED, SWITCHED, UNSWITCHED
} from "../constants/actiontype";

export type InitialStateType = {
    id: string
    title: string
    price: string
    image: string
    cart: string
    count: number
}


const initialState: Array<InitialStateType> = []

const appLoad =  (state = initialState, action: any) => {

    switch (action.type) {
        case FETCHED:
            return { ...state,
                data: action.payload,
                bool: true
            }
        case PRESSED:

            return { ...state,
                cart: action.payload,
                cartBool : true
            }
        case UNSWITCHED :
            return { ...state,
                switch: false
            }

        case SWITCHED:
            return { ...state,
                switch: true
            }
    

        default: return state
    }

};
export default appLoad;