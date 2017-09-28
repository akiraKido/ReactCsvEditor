import { IEnumerator } from "./IEnumerator";

export class CommaSeparator extends IEnumerator<string> {

    private _text: string;
    private _index = 0;

    private get canMove():boolean {
        while(/\s/.test(this.charAtIndex())) {
            // skip whitespace
            this._index++;
        }
        return this._index < this._text.length;
    }
    private charAtIndex(offset:number = 0): string {
        return this._text.charAt(this._index + offset);
    }

    constructor(text: string) {
        super();
        this._text = text;
    }

    moveNext(): boolean {
        if(!this.canMove) return false;
        if(this.charAtIndex() == '"') {
            // if escaped cell
            while(true) {
                this._index++; // eat "
                const start = this._index;
                while(this.canMove && this.charAtIndex() != '"') {
                    this._index++;
                }
                if(this.charAtIndex() != '"' && !this.canMove) {
                    // if index is at end of input
                    this.current = this._text.substring(start, this._index);
                    this._index += 1; // eat "
                    return true;
                }
                if(this.charAtIndex(-1) != "\\") {
                    // if " is not escaped
                    this.current = this._text.substring(start, this._index);
                    this._index += 2; // eat " and ,
                    return true;
                }
                this._index++; // eat \
            }
        } else {
            const start = this._index;
            while(this.canMove && this.charAtIndex() != ",") {
                this._index++;
            }
            this.current = this._text.substring(start, this._index);
            this._index++; // eat ,
            return true;
        }
    }
    
    current: string;
    
    reset(): void {
        this._index = 0;
    }

}