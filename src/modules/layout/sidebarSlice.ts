import { createSlice } from "@reduxjs/toolkit"

interface SidebarState {
  sidebarOpen: boolean
}

const initialState: SidebarState = {
  sidebarOpen: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    change: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    }
  }
})

export const { change } = sidebarSlice.actions

export default sidebarSlice.reducer
