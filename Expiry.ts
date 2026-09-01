import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import {
  Turn,
  instance as turnInstance,
} from '@civ-clone/core-turn-based-game/Turn';

export interface IExpiry extends IDataObject {
  expired(): boolean;
  expiry(): number;
}

export class Expiry extends DataObject implements IExpiry {
  private _expiry: number;
  private _turn: Turn;

  constructor(expiry: number, turn: Turn = turnInstance) {
    super();

    this._expiry = expiry;
    this._turn = turn;

    this.addKey('expired', 'expiry');
  }

  expired(): boolean {
    return this._expiry <= this._turn.value();
  }

  expiry(): number {
    return this._expiry;
  }
}

export default Expiry;
