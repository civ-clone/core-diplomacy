import { Bounds, clamp } from './Bounds';
import {
  InteractionRegistry,
  instance as interactionRegistryInstance,
} from './InteractionRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  Turn,
  instance as turnInstance,
} from '@civ-clone/core-turn-based-game/Turn';
import Player from '@civ-clone/core-player/Player';
import ReputationChanged from './Rules/Reputation/Changed';
import ReputationCreditRecord from './Records/ReputationCreditRecord';
import ReputationRecord from './Records/ReputationRecord';

export interface ReputationOptions extends Bounds {
  // A player's reputation before one is set. 0 unless given.
  initial?: number;
}

/**
 * Each player's reputation, and the credit each other player gives them against it. What the numbers mean is the rule
 *  set's: the range of a reputation is `options`, and with none given any number is kept. A credit is kept as it's
 *  given, and is 0 until one is.
 *
 * The values are `ReputationRecord`s and `ReputationCreditRecord`s in the `InteractionRegistry`, made the first time
 *  one is set, so they're saved with the rest of the diplomacy and a game that never sets one has none. Each change to
 *  a reputation is announced with a `ReputationChanged` rule.
 */
export class Reputation {
  private _interactionRegistry: InteractionRegistry;
  private _options: ReputationOptions;
  private _ruleRegistry: RuleRegistry;
  private _turn: Turn;

  constructor(
    interactionRegistry: InteractionRegistry = interactionRegistryInstance,
    ruleRegistry: RuleRegistry = ruleRegistryInstance,
    turn: Turn = turnInstance,
    options: ReputationOptions = {}
  ) {
    this._interactionRegistry = interactionRegistry;
    this._options = options;
    this._ruleRegistry = ruleRegistry;
    this._turn = turn;
  }

  /**
   * Changes `player`'s reputation by `delta`, and answers the value kept.
   */
  adjust(player: Player, delta: number, reason?: string): number {
    return this.set(player, this.get(player) + delta, reason);
  }

  /**
   * The credit `observer` gives `player` against their reputation: 0 until one is set.
   */
  credit(observer: Player, player: Player): number {
    return this.creditRecord(observer, player)?.value() ?? 0;
  }

  /**
   * `player`'s reputation: `initial` until one is set.
   */
  get(player: Player): number {
    return this.record(player)?.value() ?? this._options.initial ?? 0;
  }

  /**
   * Sets `player`'s reputation, kept within the range, and answers the value kept.
   */
  set(player: Player, value: number, reason?: string): number {
    const record = this.record(player),
      from = this.get(player),
      to = clamp(value, this._options);

    if (from === to) {
      return to;
    }

    if (record === undefined) {
      this._interactionRegistry.register(
        new ReputationRecord(player, to, this._ruleRegistry, this._turn)
      );
    } else {
      record.setValue(to);
    }

    this._ruleRegistry.process(ReputationChanged, player, from, to, reason);

    return to;
  }

  /**
   * Sets the credit `observer` gives `player` against their reputation.
   */
  setCredit(observer: Player, player: Player, value: number): void {
    const record = this.creditRecord(observer, player);

    if (record !== undefined) {
      record.setValue(value);

      return;
    }

    if (value === 0) {
      return;
    }

    this._interactionRegistry.register(
      new ReputationCreditRecord(
        observer,
        player,
        value,
        this._ruleRegistry,
        this._turn
      )
    );
  }

  private creditRecord(
    observer: Player,
    player: Player
  ): ReputationCreditRecord | undefined {
    return this._interactionRegistry
      .getByPlayers(observer, player)
      .find(
        (interaction): interaction is ReputationCreditRecord =>
          interaction instanceof ReputationCreditRecord &&
          interaction.observer() === observer &&
          interaction.player() === player
      );
  }

  private record(player: Player): ReputationRecord | undefined {
    return this._interactionRegistry
      .getByPlayers(player)
      .find(
        (interaction): interaction is ReputationRecord =>
          interaction instanceof ReputationRecord &&
          interaction.player() === player
      );
  }
}

export default Reputation;
