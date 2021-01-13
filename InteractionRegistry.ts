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

export class InteractionRegistry
  extends EntityRegistry<Interaction>
  implements IInteractionRegistry {
  constructor() {
    super(Interaction);
  }

  getByPlayer(player: Player): Interaction[] {
    return this.entries().filter((interaction: Interaction): boolean =>
      interaction.players().includes(player)
    );
  }

  getByPlayers(...players: Player[]): Interaction[] {
    return this.entries().filter((interaction: Interaction): boolean =>
      interaction.isBetween(...players)
    );
  }
}

export const instance: InteractionRegistry = new InteractionRegistry();

export default InteractionRegistry;
