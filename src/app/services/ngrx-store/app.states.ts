import * as auth from '../auth/reducers/auth.reducers';

export interface AppState {
    authState: auth.State;
}
