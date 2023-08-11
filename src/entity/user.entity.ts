import { Column, Unique, PrimaryGeneratedColumn, IsNull, Entity } from "typeorm"


@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    userId: string,

}