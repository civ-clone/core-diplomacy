import Proposal from '../../Negotiation/Proposal';
import Rule from '@civ-clone/core-rule/Rule';
/**
 * A score for a proposal, for a rule set that wants one: how a computer player would answer it, for example. Nothing in
 *  this package processes it, so a rule set that registers `Sentiment` rules asks them itself.
 */
export declare class Sentiment extends Rule<[proposal: Proposal], number> {}
export default Sentiment;
