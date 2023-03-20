import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserWordEntity } from "./user-word.entity";

@Entity({ name: "users" })
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' , length: 255 , name: 'user_name' })
    userName: string;

    @Column({ type: 'varchar' , length: 255 , name: 'password' })
    password: string;

    @Column({ type: 'varchar' , length: 20 , name: 'rol' })
    rol: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    @OneToMany(()=> UserWordEntity, userWord => userWord.user)
     userWords: UserWordEntity[];
} 