import { Interaction, IInteraction } from '../Interaction';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import { Turn } from '@civ-clone/core-turn-based-game/Turn';

export interface IAttitudeRecord extends IInteraction {
  holder(): Player;
  setValue(value: number): void;
  toward(): Player;
  value(): number;
}

/**
 * How `holder` feels about `toward`: one direction of one pair, kept in the `InteractionRegistry` so that it's saved
 *  with the rest of the diplomacy. Made the first time a value is set (`Attitude`), so a game that never sets one has
 *  none.
 */
export class AttitudeRecord extends Interaction implements IAttitudeRecord {
  private _holder: Player;
  private _toward: Player;
  private _value: number;

  constructor(
    holder: Player,
    toward: Player,
    value: number,
    ...args: (RuleRegistry | Turn)[]
  ) {
    super(holder, toward, ...args);

    this._holder = holder;
    this._toward = toward;
    this._value = value;

    this.addKey('holder', 'toward', 'value');
  }

  holder(): Player {
    return this._holder;
  }

  setValue(value: number): void {
    this._value = value;
  }

  toward(): Player {
    return this._toward;
  }

  value(): number {
    return this._value;
  }
}

export default AttitudeRecord;
