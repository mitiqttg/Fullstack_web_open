import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterChange(state, action) {
            return action.payload
        }
    }
})

// const filterReducer = (state = '', action) => {
//     switch (action.type) {
//         case 'SET_FILTER':
//             return action.payload
//         default:
//             return state
//     }
// }

// export const filterChange = (filter) => {
//     return {
//         type: 'SET_FILTER',
//         payload: filter
//     }
// }

export default filterSlice.reducer