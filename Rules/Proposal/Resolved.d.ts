import Rule from '@civ-clone/core-rule/Rule';
import Proposal from '../../Negotiation/Proposal';
import Resolution from '../../Proposal/Resolution';
export declare class Resolved extends Rule<
  [resolution: Resolution, proposal: Proposal],
  Promise<void>
> {}
export default Resolved;
