import { IInteraction } from '../../Interaction';
import Negotiation from '../../Negotiation';
import Rule from '@civ-clone/core-rule/Rule';
export declare class Interaction extends Rule<
  [interaction: IInteraction, negotiation: Negotiation]
> {}
export default Interaction;
