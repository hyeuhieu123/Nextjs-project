export interface IBaseUser {
    data: IUser[];
    totalCount: number;
}

export interface IUser {
    id: string;
    passwordEnabled: boolean;
    totpEnabled: boolean;
    backupCodeEnabled: boolean;
    twoFactorEnabled: boolean;
    banned: boolean;
    locked: boolean;
    createdAt: number;
    updatedAt: number;
    imageUrl: string;
    hasImage: boolean;
    primaryEmailAddressId: string;
    primaryPhoneNumberId: null;
    primaryWeb3WalletId: null;
    lastSignInAt: number;
    externalId: null;
    username: null | string;
    firstName: string;
    lastName: null | string;
    publicMetadata: PublicMetadata;
    privateMetadata: PublicMetadata;
    unsafeMetadata: PublicMetadata;
    emailAddresses: EmailAddress[];
    phoneNumbers: any[];
    web3Wallets: any[];
    externalAccounts: ExternalAccount[];
    samlAccounts: any[];
    lastActiveAt: number;
    createOrganizationEnabled: boolean;
    createOrganizationsLimit: null;
}

interface ExternalAccount {
    id: string;
    approvedScopes: string;
    emailAddress: string;
    imageUrl: string;
    username: null | string;
    publicMetadata: PublicMetadata;
    label: null;
    verification: Verification2;
    provider?: string;
    identificationId?: string;
    externalId?: string;
    firstName?: string;
    lastName?: string;
}

interface Verification2 {
    status: string;
    strategy: string;
    externalVerificationRedirectURL: null;
    attempts: null;
    expireAt: number;
    nonce: null;
}

interface EmailAddress {
    id: string;
    emailAddress: string;
    verification: Verification;
    linkedTo: LinkedTo[];
}

interface LinkedTo {
    id: string;
    type: string;
}

interface Verification {
    status: string;
    strategy: string;
    externalVerificationRedirectURL: null;
    attempts: null;
    expireAt: null;
    nonce: null;
}

interface PublicMetadata {
}
