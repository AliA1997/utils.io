// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import modalSlice, { ModalState } from './modalSlice';
import authSlice, { AuthState } from './authSlice';

export interface UtilsIoStore {
    modal: ModalState;
    auth: AuthState;
}

const rootReducer = combineReducers<UtilsIoStore>({
  modal: modalSlice,
  auth: authSlice,
});

export default rootReducer;
