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
  #expiry: number;
  #turn: Turn;

  constructor(expiry: number, turn: Turn = turnInstance) {
    super();

    this.#expiry = expiry;
    this.#turn = turn;

    this.addKey('expired', 'expiry');
  }

  expired(): boolean {
    return this.#expiry <= this.#turn.value();
  }

  expiry(): number {
    return this.#expiry;
  }
}

export default Expiry;
