import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
    Auth,
    IUserInfo,
    Metadata,
    ProactiveRefresh,
    ReloadUserInfo,
    StsTokenManager,
    UserResponse
} from "../../models/types";

export interface UserState {
    userData: UserResponse;
    userInfo: IUserInfo
}

const initialState: UserState = {
    userData: {
        accessToken: '',
        auth: {},
        displayName: '',
        email: '',
        emailVerified: '',
        isAnonymous: '',
        metadata: {},
        phoneNumber: '',
        photoURL: '',
        proactiveRefresh: {},
        providerData: [],
        providerId: '',
        reloadListener: '',
        reloadUserInfo: {},
        stsTokenManager: {},
        tenantId: '',
        uid: '',

    },
    userInfo: JSON.parse(localStorage.getItem('user') as string),
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userConfig: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload.providerData[0]));
        },
        clearConfig: (state) => {
            let defaultUser = {
                    accessToken: '',
                    auth: {},
                    displayName: '',
                    email: '',
                    emailVerified: '',
                    isAnonymous: '',
                    metadata: {},
                    phoneNumber: '',
                    photoURL: '',
                    proactiveRefresh: {},
                    providerData: [],
                    providerId: '',
                    reloadListener: '',
                    reloadUserInfo: {},
                    stsTokenManager: {},
                    tenantId: '',
                    uid: '',

                };
            state.userData = defaultUser;
            localStorage.clear();
        }
    },
})


export const { userConfig, clearConfig } = userSlice.actions

export default userSlice.reducer