import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Declaration from './Declaration';
import Player from '@civ-clone/core-player/Player';
export interface IDeclarationRegistry extends IEntityRegistry<Declaration> {
  getByPlayer(player: Player): Declaration[];
  getByPlayers(...players: Player[]): Declaration[];
}
export declare class DeclarationRegistry
  extends EntityRegistry<Declaration>
  implements IDeclarationRegistry {
  constructor();
  getByPlayer(player: Player): Declaration[];
  getByPlayers(...players: Player[]): Declaration[];
}
export declare const instance: DeclarationRegistry;
export default DeclarationRegistry;
