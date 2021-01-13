import { Expiry, IExpiry } from '../Expiry';
export interface INever extends IExpiry {}
export declare class Never extends Expiry implements INever {
  constructor();
}
export default Never;
