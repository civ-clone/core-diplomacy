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

// The same players, in any order and counted once, give the same key, as `isBetween` compares them as a set.
const playersKey = (players: Player[]): string =>
  Array.from(new Set(players.map((player: Player): string => player.id())))
    .sort()
    .join('\u0000');

export class InteractionRegistry
  extends EntityRegistry<IInteraction>
  implements IInteractionRegistry
{
  // An interaction's players are set when it's made and never change. Scanning every interaction for each lookup was
  //  most of a late-game turn, as route finding asks about a treaty on each step (civ-clone/web-renderer#657).
  private _byPlayers = this.index((interaction: IInteraction): string =>
    playersKey(interaction.players())
  );

  constructor() {
    super(Interaction);
  }

  getByPlayer(player: Player): IInteraction[] {
    return this.entries().filter((interaction: IInteraction): boolean =>
      interaction.players().includes(player)
    );
  }

  getByPlayers(...players: Player[]): IInteraction[] {
    return this._byPlayers.get(playersKey(players));
  }
}

export const instance: InteractionRegistry = new InteractionRegistry();

export default InteractionRegistry;
