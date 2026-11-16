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
import AttitudeChanged from './Rules/Attitude/Changed';
import AttitudeRecord from './Records/AttitudeRecord';
import Player from '@civ-clone/core-player/Player';

export interface AttitudeOptions extends Bounds {
  // What `adjust` starts from when `holder` has no attitude toward `toward` yet. 0 unless given.
  initial?: number;
}

/**
 * How each player feels about each other: a number per direction of each pair, `holder` toward `toward`. What the
 *  numbers mean (whether higher is warmer or colder, and the range) is the rule set's: the range is `options`, and
 *  with none given any number is kept.
 *
 * The values are `AttitudeRecord`s in the `InteractionRegistry`, made the first time one is set, so they're saved with
 *  the rest of the diplomacy and a game that never sets one has none. Each change is announced with an
 *  `AttitudeChanged` rule.
 */
export class Attitude {
  private _interactionRegistry: InteractionRegistry;
  private _options: AttitudeOptions;
  private _ruleRegistry: RuleRegistry;
  private _turn: Turn;

  constructor(
    interactionRegistry: InteractionRegistry = interactionRegistryInstance,
    ruleRegistry: RuleRegistry = ruleRegistryInstance,
    turn: Turn = turnInstance,
    options: AttitudeOptions = {}
  ) {
    this._interactionRegistry = interactionRegistry;
    this._options = options;
    this._ruleRegistry = ruleRegistry;
    this._turn = turn;
  }

  /**
   * Changes `holder`'s attitude toward `toward` by `delta`, from `initial` when it has none yet, and answers the value
   *  kept.
   */
  adjust(
    holder: Player,
    toward: Player,
    delta: number,
    reason?: string
  ): number {
    return this.set(
      holder,
      toward,
      (this.get(holder, toward) ?? this._options.initial ?? 0) + delta,
      reason
    );
  }

  /**
   * `holder`'s attitude toward `toward`, or `undefined` if it has none.
   */
  get(holder: Player, toward: Player): number | undefined {
    return this.record(holder, toward)?.value();
  }

  /**
   * Sets `holder`'s attitude toward `toward`, kept within the range, and answers the value kept.
   */
  set(holder: Player, toward: Player, value: number, reason?: string): number {
    const record = this.record(holder, toward),
      from = record?.value(),
      to = clamp(value, this._options);

    if (from === to) {
      return to;
    }

    if (record === undefined) {
      this._interactionRegistry.register(
        new AttitudeRecord(holder, toward, to, this._ruleRegistry, this._turn)
      );
    } else {
      record.setValue(to);
    }

    this._ruleRegistry.process(
      AttitudeChanged,
      holder,
      toward,
      from,
      to,
      reason
    );

    return to;
  }

  private record(holder: Player, toward: Player): AttitudeRecord | undefined {
    return this._interactionRegistry
      .getByPlayers(holder, toward)
      .find(
        (interaction): interaction is AttitudeRecord =>
          interaction instanceof AttitudeRecord &&
          interaction.holder() === holder &&
          interaction.toward() === toward
      );
  }
}

export default Attitude;
