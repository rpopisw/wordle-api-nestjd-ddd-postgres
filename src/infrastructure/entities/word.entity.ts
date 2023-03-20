import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserWordEntity } from "./user-word.entity";

@Entity('words')
export class WordEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' , length: 255 , name: 'word' })
    word: string;

    @OneToMany(()=> UserWordEntity, userWord => userWord.word)
    userWords: UserWordEntity[];
}