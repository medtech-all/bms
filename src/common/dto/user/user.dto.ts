import { Expose, Exclude } from "class-transformer"

export class UserDto {
    @Expose()
    userId: string
    @Expose()
    firstName: string
    @Expose()
    lastName: string
    @Expose()
    username: string
    @Exclude()
    password: string
    @Exclude()
    bankAccountNumber: string
    @Exclude()
    phoneNumber: string
    @Expose()
    email?: string
}
