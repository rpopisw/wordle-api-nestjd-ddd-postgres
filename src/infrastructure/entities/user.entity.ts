import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "users" })
export class UserEntity{
    @PrimaryColumn({ type: 'varchar' , length: 36 })
    id: string;

    @Column({ type: 'varchar' , length: 255 , name: 'user_name' })
    userName: string;

    @Column({ type: 'varchar' , length: 255 , name: 'password' })
    password: string;

    @Column({ type: 'varchar' , length: 20 , name: 'rol' })
    rol: string;

    @Column({ type: 'datetime' })
    createdAt: Date;
  
    @Column({ type: 'datetime', nullable: true })
    updatedAt: Date;
} 