export interface Auth {
}

export interface Metadata {
}

export interface ProactiveRefresh {
}

export interface ReloadUserInfo {
}

export interface StsTokenManager {
}

export interface UserResponse {
    accessToken?: string;
    auth?: Auth;
    displayName?: string;
    email?: string;
    emailVerified?: string;
    isAnonymous?: string;
    metadata?: Metadata;
    phoneNumber?: any;
    photoURL?: string;
    proactiveRefresh?: ProactiveRefresh;
    providerData: any[];
    providerId?: string;
    reloadListener?: any;
    reloadUserInfo?: ReloadUserInfo;
    stsTokenManager?: StsTokenManager;
    tenantId?: any;
    uid?: string;
}

export interface IUserInfo {
    displayName: string;
    email: string;
    phoneNumber?: string,
    photoURL: string;
    providerId: string;
    uid: string;
}

export type foodItem = {
    id: string
    title: string
    imageURL: string | undefined | null
    category: string
    calories: string
    qty: number
    price: string
}


















