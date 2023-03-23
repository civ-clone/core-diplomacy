import Rule from '@civ-clone/core-rule/Rule';
import Proposal from '../../Negotiation/Proposal';
import Resolution from '../../Proposal/Resolution';
export declare class Resolved extends Rule<
  [resolution: Resolution, proposal: Proposal],
  void
> {}
export default Resolved;
