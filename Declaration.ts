import { Interaction, IInteraction } from './Interaction';
import Expiry from './Expiry';
import Player from '@civ-clone/core-player/Player';

export interface IDeclaration extends IInteraction {
  expiry(): Expiry;
}

export class Declaration extends Interaction implements IDeclaration {
  #expiry: Expiry = new Expiry(Infinity);

  constructor(expiry: Expiry, ...players: Player[]) {
    super(...players);

    this.#expiry = expiry;
  }

  expiry(): Expiry {
    return this.#expiry;
  }
}

export default Declaration;
