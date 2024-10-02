import { Action, createAction, props } from '@ngrx/store';
import { UserInfoLogin } from 'src/app/models/auth-models/userInfo';

export const addUserLogin = createAction(
  'Add UserLogin',
  props<UserInfoLogin>()
);
export const removeUserLogin = createAction(
  'Remove UserLogin',
  props<UserInfoLogin>()
);
export const clearUserLogin = createAction('Clear UserLogin');
