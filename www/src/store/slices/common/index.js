import { createSlice } from '@reduxjs/toolkit'

const { actions, reducer } = createSlice({
  name: 'common',
  initialState: {
    isRu: true,
    isDark: false,
    isMenuOpen: false,
    widthScreen: null
  },
  reducers: {
    setWindowSize (state, action) {
      state.widthScreen = action.payload
    },
    openMenu (state) {
      state.isMenuOpen = true
    },
    closeMenu (state) {
      state.isMenuOpen = false
    }
  }
})

export const selectIsMenuOpen = (state) => state.common.isMenuOpen
export const selectWidthScreen = (state) => state.common.widthScreen
export const { setWindowSize, openMenu, closeMenu } = actions

export default reducer
