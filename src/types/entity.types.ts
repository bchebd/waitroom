export interface User {
    id: string | number | null,
    name: string,
    passwd: string,
    admin: boolean
}

export interface Tag {
    id: number,
    userId: number
}