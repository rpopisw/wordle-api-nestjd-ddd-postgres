import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { WordEntity } from "./word.entity";

@Entity('user_words')
export class UserWordEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'boolean' , name: 'is_resolved' })
    isResolved: boolean;

    @Column({ type: 'integer' , name: 'attempts', default: 0 })
    attempts: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      name: 'updated_at',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;
    
    @ManyToOne(()=> UserEntity, user => user.userWords)
    @JoinColumn({
      name: 'user_id',
      referencedColumnName: 'id'
    })
    user: UserEntity;

    @ManyToOne(()=> WordEntity, word => word.userWords)
    @JoinColumn({
      name: 'word_id',
      referencedColumnName: 'id'
    })
    word: WordEntity;
}