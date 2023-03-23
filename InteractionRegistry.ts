import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import { Interaction, IInteraction } from './Interaction';
import Player from '@civ-clone/core-player/Player';

export interface IInteractionRegistry extends IEntityRegistry<IInteraction> {
  getByPlayer(player: Player): IInteraction[];
  getByPlayers(...players: Player[]): IInteraction[];
}

export class InteractionRegistry
  extends EntityRegistry<IInteraction>
  implements IInteractionRegistry
{
  constructor() {
    super(Interaction);
  }

  getByPlayer(player: Player): IInteraction[] {
    return this.entries().filter((interaction: IInteraction): boolean =>
      interaction.players().includes(player)
    );
  }

  getByPlayers(...players: Player[]): IInteraction[] {
    return this.entries().filter((interaction: IInteraction): boolean =>
      interaction.isBetween(...players)
    );
  }
}

export const instance: InteractionRegistry = new InteractionRegistry();

export default InteractionRegistry;
