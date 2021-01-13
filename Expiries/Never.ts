import { Expiry, IExpiry } from '../Expiry';

export interface INever extends IExpiry {}

export class Never extends Expiry implements INever {
  constructor() {
    super(Infinity);
  }
}

export default Never;
