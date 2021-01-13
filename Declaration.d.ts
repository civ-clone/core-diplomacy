import { Interaction, IInteraction } from './Interaction';
import Expiry from './Expiry';
import Player from '@civ-clone/core-player/Player';
export interface IDeclaration extends IInteraction {
  expiry(): Expiry;
}
export declare class Declaration extends Interaction implements IDeclaration {
  #private;
  constructor(expiry: Expiry, ...players: Player[]);
  expiry(): Expiry;
}
export default Declaration;
