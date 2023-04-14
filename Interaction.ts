import {
  DataObject,
  IDataObject,
} from '@civ-clone/core-data-object/DataObject';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Player from '@civ-clone/core-player/Player';
import Created from './Rules/Interaction/Created';
import {
  Turn,
  instance as turnInstance,
} from '@civ-clone/core-turn-based-game/Turn';

export interface IInteraction extends IDataObject {
  isBetween(...players: Player[]): boolean;
  players(): Player[];
  when(): number;
}

export class Interaction extends DataObject implements IInteraction {
  #players: Set<Player> = new Set();
  #ruleRegistry: RuleRegistry = ruleRegistryInstance;
  #turn: Turn = turnInstance;
  #when: number;

  constructor(...args: (Player | RuleRegistry | Turn)[]) {
    super();

    args.forEach((arg) => {
      if (arg instanceof Player) {
        this.#players.add(arg);
      }

      if (arg instanceof RuleRegistry) {
        this.#ruleRegistry = arg;
      }

      if (arg instanceof Turn) {
        this.#turn = arg;
      }
    });

    this.#when = this.#turn.value();

    this.addKey('players', 'when');

    this.#ruleRegistry.process(Created, this as Interaction);
  }

  isBetween(...players: Player[]): boolean {
    const uniquePlayers = Array.from(new Set(players));

    return (
      uniquePlayers.every((player: Player): boolean =>
        this.#players.has(player)
      ) && uniquePlayers.length === this.#players.size
    );
  }

  players(): Player[] {
    return Array.from(this.#players);
  }

  protected ruleRegistry(): RuleRegistry {
    return this.#ruleRegistry;
  }

  when(): number {
    return this.#when;
  }
}

export default Interaction;
