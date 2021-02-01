import { Service } from 'egg';

/**
 * Test Service
 */
export default class User extends Service {

  /**
   * sayHi to you
   * @param unreData - your unreData
   */
  public async register({ ...unreData }) {
    return `hi, ${unreData}`;
  }

}
