export enum DomainExceptonsCode {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
    DEFAULT = 'DEFAULT'
}

export class DomainException extends Error {
    constructor( public readonly message : string) {
        super(message);
        this.name = DomainExceptonsCode.DEFAULT;
    }
}