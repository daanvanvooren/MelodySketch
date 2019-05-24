import { User } from './user.model';
import { Melody } from './melody.model';

export class Comment {
    //Constructor
    constructor(
        private _created = new Date(),
        private _text: string,
        private _author: User,
        private _melody: Melody,
        private _id?: number
    ) { }

    //Getters
    get id(): number {
        return this._id;
    }

    get created(): Date {
        return this._created;
    }

    get text(): string {
        return this._text;
    }

    get author(): User {
        return this._author;
    }

    get melody(): Melody {
        return this._melody;
    }

    //Methods
    static fromJSON(json: any): Comment {
        const com = new Comment(json.created, json.text, json.author, json.melody, json.id);
        return com;
    }

    toJSON(): any {
        return {
            created: this.created,
            text: this.text,
            author: this.author.toJSONOnlyUsername(),
            melody: this.melody.toJSONOnlyID()
        };
    }
}
