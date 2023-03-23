import { IAction } from '../../Negotiation/Action';
import Negotiation from '../../Negotiation';
import Rule from '@civ-clone/core-rule/Rule';

export class Step extends Rule<[negotiation: Negotiation], IAction> {}

export default Step;
