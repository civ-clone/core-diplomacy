import Declaration from '../../Declaration';
import Player from '@civ-clone/core-player/Player';
import Rule from '@civ-clone/core-rule/Rule';

/**
 * A declaration has ended: `by` is the player who ended it, or `null` when no
 * one did (it ran its course).
 */
export class Expired extends Rule<[Declaration, Player | null]> {}

export default Expired;
