import * as bcrypt from 'bcrypt';

export class UserPasswordService {

  private saltRounds = 10;
  private encoder;

  constructor() {
    this.encoder = bcrypt;
  }

  public getHash(password: string | undefined): Promise<string> {
    return this.encoder.hash(password, this.saltRounds);
  }

  public compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
    return this.encoder.compare(password, hash);
  }
}
