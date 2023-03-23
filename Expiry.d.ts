import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';
export interface IExpiry extends IDataObject {
  expired(): boolean;
  expiry(): number;
}
export declare class Expiry extends DataObject implements IExpiry {
  #private;
  constructor(expiry: number, turn?: Turn);
  expired(): boolean;
  expiry(): number;
}
export default Expiry;
