import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Interaction from './Interaction';
import Player from '@civ-clone/core-player/Player';
export interface IInteractionRegistry extends IEntityRegistry<Interaction> {
  getByPlayer(player: Player): Interaction[];
  getByPlayers(...players: Player[]): Interaction[];
}
export declare class InteractionRegistry
  extends EntityRegistry<Interaction>
  implements IInteractionRegistry {
  constructor();
  getByPlayer(player: Player): Interaction[];
  getByPlayers(...players: Player[]): Interaction[];
}
export declare const instance: InteractionRegistry;
export default InteractionRegistry;
