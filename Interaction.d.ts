import Player from '@civ-clone/core-player/Player';
export interface IInteraction {
  isBetween(...players: Player[]): boolean;
  players(): Player[];
}
export declare class Interaction implements IInteraction {
  #private;
  constructor(...players: Player[]);
  isBetween(...players: Player[]): boolean;
  players(): Player[];
}
export default Interaction;
