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
  private _players: Set<Player> = new Set();
  private _ruleRegistry: RuleRegistry = ruleRegistryInstance;
  // `protected` because `Declaration` writes it too. It declared its own
  // `#turn` before this change; the two slots merge without any behavioural
  // difference, as this one is read only by the constructor below.
  protected _turn: Turn = turnInstance;
  private _when: number;

  constructor(...args: (Player | RuleRegistry | Turn)[]) {
    super();

    args.forEach((arg) => {
      if (arg instanceof Player) {
        this._players.add(arg);
      }

      if (arg instanceof RuleRegistry) {
        this._ruleRegistry = arg;
      }

      if (arg instanceof Turn) {
        this._turn = arg;
      }
    });

    this._when = this._turn.value();

    this.addKey('players', 'when');

    this._ruleRegistry.process(Created, this as Interaction);
  }

  isBetween(...players: Player[]): boolean {
    const uniquePlayers = Array.from(new Set(players));

    return (
      uniquePlayers.every((player: Player): boolean =>
        this._players.has(player)
      ) && uniquePlayers.length === this._players.size
    );
  }

  players(): Player[] {
    return Array.from(this._players);
  }

  protected ruleRegistry(): RuleRegistry {
    return this._ruleRegistry;
  }

  when(): number {
    return this._when;
  }
}

export default Interaction;
