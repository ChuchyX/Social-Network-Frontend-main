import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { ReturnUser } from 'src/app/models/ReturnUser';
import {
  getUserFailure,
  getUserSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  Logout,
} from './auth.actions';
import { UserState } from './auth.UserState';

export const initialState: UserState = {
  token: null,
  user: null,
  loginError: null,
  loading: null,
};

export const userReducer = createReducer(
  initialState,
  on(loginRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(loginSuccess, (state, { loginSuccessResponse }) => ({
    ...state,
    token: loginSuccessResponse.token,
    user: loginSuccessResponse.user,
    loginError: null,
    loading: false,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loginError: error,
    token: '',
    user: null,
  })),
  on(getUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loginError: null,
  })),
  on(getUserFailure, (state, { error }) => ({
    ...state,
    loginError: error,
    token: '',
    user: null,
  })),
  on(Logout, (state) => ({
    ...state,
    loginError: null,
    token: null,
    user: null,
  }))
);
