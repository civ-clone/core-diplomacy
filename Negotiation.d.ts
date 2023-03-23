import { Interaction, IInteraction } from './Interaction';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { IAction } from './Negotiation/Action';
import Player from '@civ-clone/core-player/Player';
export interface INegotiation extends IInteraction {
  interactions(): IAction[];
  lastInteraction(): IAction | null;
  nextSteps(): IAction[];
  proceed(nextStep: IAction): void;
  terminated(): boolean;
}
export declare class Negotiation extends Interaction implements INegotiation {
  #private;
  constructor(...args: (Player | RuleRegistry)[]);
  interactions(): IAction[];
  lastInteraction(): IAction | null;
  nextSteps(): IAction[];
  proceed(nextStep: IAction): void;
  terminated(): boolean;
}
export default Negotiation;
