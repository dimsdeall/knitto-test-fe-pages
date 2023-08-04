import { PaginationType } from "@/config/@types/pagination";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: PaginationType = {
    limit: 10,
    page: 1
}

export const pageSlice = createSlice({
    name: 'pageReducer',
    initialState,
    reducers: {
        updatePage: (state, action: PayloadAction<PaginationType['page']>) => {
            return {
                ...state,
                page: action.payload
            }
        },
    }
})

export const { updatePage } = pageSlice.actions

export default pageSlice.reducer