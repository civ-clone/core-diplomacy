import Proposal from '../../Negotiation/Proposal';
import Rule from '@civ-clone/core-rule/Rule';

export class Declined extends Rule<[proposal: Proposal]> {}

export default Declined;
