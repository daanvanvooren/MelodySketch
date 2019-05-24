export class Note {
    //Constructor
    constructor(
        private _xCoor: number,
        private _yCoor: number
    ) { }

    //Getters
    get xCoor(): number {
        return this._xCoor;
    }

    get yCoor(): number {
        return this._yCoor;
    }

    //Methods
    toJSON(): any {
        return {
            xCoor: this.xCoor,
            yCoor: this.yCoor
        };
    }
}
