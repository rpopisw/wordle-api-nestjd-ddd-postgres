import { AggregateRoot } from "@nestjs/cqrs";

export type UserWordsEssentials = {
    userId: string;
    wordId: number;
}

export type UserWordsOptional = {
    id?: number;
    isResolved?: boolean;
}

export type UserWords = Required<UserWordsEssentials> & Partial<UserWordsOptional>;

export class UserWord extends AggregateRoot<UserWords> {
    private readonly id: number;
    private readonly userId: string;
    private readonly wordId: number;
    private readonly createdAt: Date;
    private readonly updatedAt: Date;
    private isResolved: boolean;

    constructor(properties: UserWords) {
        super();
        Object.assign(this, properties);
        this.createdAt = new Date();
        this.isResolved = false;
    }

    properties() {
        return {
            id: this.id,
            userId: this.userId,
            wordId: this.wordId,
            isResolved: this.isResolved,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }
    }

    resolve() {
        this.isResolved = true;
    }
}