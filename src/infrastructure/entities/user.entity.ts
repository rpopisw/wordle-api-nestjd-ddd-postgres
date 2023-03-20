import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;
} 