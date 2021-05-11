export interface IUserAuthor {
    id: string,
    lastName: string,
    firstName: string,
    locked: boolean,
    profileImageUrl?: string,
    cover?: string,
    email: string,
    userType: number,
    deleted: boolean,
    blocked: boolean,
    isSuperAdmin: boolean
}