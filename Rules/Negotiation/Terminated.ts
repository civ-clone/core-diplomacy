import Negotiation from '../../Negotiation';
import Rule from '@civ-clone/core-rule/Rule';

export class Terminated extends Rule<[negotiation: Negotiation]> {}

export default Terminated;
