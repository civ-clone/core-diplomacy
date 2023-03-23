import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import { IInteraction } from './Interaction';
import Player from '@civ-clone/core-player/Player';
export interface IInteractionRegistry extends IEntityRegistry<IInteraction> {
  getByPlayer(player: Player): IInteraction[];
  getByPlayers(...players: Player[]): IInteraction[];
}
export declare class InteractionRegistry
  extends EntityRegistry<IInteraction>
  implements IInteractionRegistry
{
  constructor();
  getByPlayer(player: Player): IInteraction[];
  getByPlayers(...players: Player[]): IInteraction[];
}
export declare const instance: InteractionRegistry;
export default InteractionRegistry;
