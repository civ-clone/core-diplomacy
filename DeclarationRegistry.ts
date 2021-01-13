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

export class DeclarationRegistry
  extends EntityRegistry<Declaration>
  implements IDeclarationRegistry {
  constructor() {
    super(Declaration);
  }

  getByPlayer(player: Player): Declaration[] {
    return this.entries().filter((interaction: Declaration): boolean =>
      interaction.players().includes(player)
    );
  }

  getByPlayers(...players: Player[]): Declaration[] {
    return this.entries().filter((interaction: Declaration): boolean =>
      interaction.isBetween(...players)
    );
  }
}

export const instance: DeclarationRegistry = new DeclarationRegistry();

export default DeclarationRegistry;
