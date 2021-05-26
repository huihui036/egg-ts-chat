import { Service } from 'egg';
import { v4 as uuidv4 } from 'uuid';
import { hashSync } from 'bcrypt';
import { Regiter, RegiterDb } from '../interface/interface';
/**
 * Test Service
 */
interface serachData {
  status: number
}
export default class User extends Service {

  /**
   * sayHi to you
   * @param unreData - your unreData
   */
  public async register(unreData: Regiter): Promise<serachData> {
    const seachEnd = {
      status: 1,
    };

    const userDb: RegiterDb = { ...unreData, state: 1, account: uuidv4() };
    const saltRounds = 10;
    userDb.password = hashSync(userDb.password, saltRounds);
    return new Promise((resolve, reject) => {
      this.app.model.User.create(userDb, (err, data) => {
        if (err) {
          console.log(err);
          seachEnd.status = 0;
          reject(seachEnd);
        } else {
          console.log(data);
          resolve(seachEnd);
        }
      });
    });
  }

  public async findUserByemail(email: string): Promise<RegiterDb> {

    return new Promise((resolve, reject) => {
      this.app.model.User.findOne({ email }, (err, data) => {
        if (err) {
          reject(err);
        } else if (!data) {
          resolve(data);
        } else {
          resolve(data);
        }
      });
    });

  }


}
