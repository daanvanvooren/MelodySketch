import { User } from './user.model';
import { Note } from './note.model';

export class Melody {
    //Constructor
    constructor(
        private _author: User,
        private _dateCreated = new Date(),
        private _notes = new Array<Note>(),
        private _bpm: number,
        private _name: string,
        private _description: string,
        private _id?: number

    ) { }

    //Getters
    get id(): number {
        return this._id;
    }

    get author(): User {
        return this._author;
    }

    get dateCreated(): Date {
        return this._dateCreated;
    }

    get notes(): Array<Note> {
        return this._notes;
    }

    get bpm(): number {
        return this._bpm;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    //Methods
    static fromJSON(json: any): Melody {
        const mel = new Melody(json.author, json.created, json.notes, json.bpm, json.name, json.description, json.id);
        return mel;
    }

    toJSON(): any {
        return {
            author: this.author,
            created: this.dateCreated,
            notes: this.notes.map(note => note.toJSON()),
            bpm: this.bpm,
            name: this.name,
            description: this.description
        };
    }

    toJSONOnlyID(): any {
        return {
            id: this.id,
        };
    }
}
