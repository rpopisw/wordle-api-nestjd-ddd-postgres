import { AggregateRoot } from "@nestjs/cqrs";

export type WordEssentials = {
    word: string;
}

export type WordOptional = {
    id?: number;
}

export type WordProperties = Required<WordEssentials> & Partial<WordOptional>;

export class Word extends AggregateRoot<WordProperties> {
    private readonly id: number;
    private readonly word: string;
    
    constructor(properties: WordProperties) {
        super();
        Object.assign(this, properties);
    }

    properties(){
        return {
            id: this.id,
            word: this.word
        }
    }
}
    