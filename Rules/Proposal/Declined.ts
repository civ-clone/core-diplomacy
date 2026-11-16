import Proposal from '../../Negotiation/Proposal';
import Rule from '@civ-clone/core-rule/Rule';

export class Declined extends Rule<
  [proposal: Proposal],
  void | Promise<void>
> {}

export default Declined;
