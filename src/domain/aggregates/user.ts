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
    private password: string;
    private readonly rol: string;
    private readonly createdAt: Date;
    private readonly updatedAt: Date;

    constructor(properties: UserProperties) {
        super();
        Object.assign(this, properties);
        this.createdAt = new Date();
    }

    encryptPassword(){
        this.password = bcrypt.hashSync(this.password, 10);
    }

    comparePassword(password: string){
        return bcrypt.compareSync(password, this.password);
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