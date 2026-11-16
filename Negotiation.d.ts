import { Interaction, IInteraction } from './Interaction';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { IAction } from './Negotiation/Action';
import Player from '@civ-clone/core-player/Player';
export interface INegotiation extends IInteraction {
  initiator(): Player;
  interactions(): IAction[];
  lastInteraction(): IAction | null;
  nextSteps(): IAction[];
  proceed(nextStep: IAction): void;
  terminated(): boolean;
}
export declare class Negotiation extends Interaction implements INegotiation {
  private _interactions;
  constructor(...args: (Player | RuleRegistry)[]);
  /**
   * The player who opened the negotiation: the first of the players it was made with. Either player may open one; the
   *  other answers. The players keep the order they were given in, in a saved game too.
   */
  initiator(): Player;
  interactions(): IAction[];
  lastInteraction(): IAction | null;
  nextSteps(): IAction[];
  proceed(nextStep: IAction): void;
  terminated(): boolean;
}
export default Negotiation;
