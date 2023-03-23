import Expiry from '../Expiry';

export class Never extends Expiry {
  constructor() {
    super(Infinity);
  }

  expired(): boolean {
    return false;
  }
}

export default Never;
