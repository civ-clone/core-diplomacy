import Player from '@civ-clone/core-player/Player';

export interface IInteraction {
  isBetween(...players: Player[]): boolean;
  players(): Player[];
}

export class Interaction implements IInteraction {
  #players: Player[] = [];

  constructor(...players: Player[]) {
    this.#players.push(...players);
  }

  isBetween(...players: Player[]): boolean {
    return (
      players.every((player: Player): boolean =>
        this.#players.includes(player)
      ) && players.length === this.#players.length
    );
  }

  players(): Player[] {
    return this.#players;
  }
}

export default Interaction;
