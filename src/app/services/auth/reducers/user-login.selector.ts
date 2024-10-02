import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfoLogin } from 'src/app/models/auth-models/userInfo';

export const getInfoLogin = createSelector(
  createFeatureSelector('userLoginEntries'),
  (state: UserInfoLogin) => {
    debugger;
    return state;
  }
);
