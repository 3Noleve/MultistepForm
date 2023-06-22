import { combineReducers } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import FormReducer from '~/app/redux/features/FormSlice'
import StepReducer from '~/app/redux/features/StepSlice'

const rootReducer = combineReducers({
  FormReducer,
  StepReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
