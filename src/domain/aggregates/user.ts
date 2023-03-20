import { AggregateRoot } from "@nestjs/cqrs";
import * as bcrypt from 'bcrypt';

export type UserEssentials = {
    userName: string;
    password: string;
    rol: string;
}

export type UserOptional = {
    id?: string;
}

export type UserProperties = Required<UserEssentials> & Partial<UserOptional>;

export class User extends AggregateRoot<UserProperties> {
    private readonly id: string;
    private readonly userName: string;
    private readonly password: string;
    private readonly rol: string;
    private readonly createdAt: Date;
    private readonly updatedAt: Date;

    constructor(properties: UserProperties) {
        super();
        Object.assign(this, properties);
        this.createdAt = new Date();
        this.password = this.encryptPassword();
    }

    encryptPassword(){
        return bcrypt.hashSync(this.password, 10);
    }

    properties(){
        return {
            id: this.id,
            userName: this.userName,
            password: this.password,
            rol: this.rol,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }
}