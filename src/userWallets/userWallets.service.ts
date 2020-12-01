import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { UserWalletsRepository } from './userWallets.repository';
import { IUserWallet } from './interfaces';

@Injectable()
export class UserWalletsService {
  constructor(private readonly userWalletsRepository: UserWalletsRepository) { }

  /**
   * Ensure that user wallet exists (find or create)
   * @param userId
   */
  public async ensureWalletForUser(userId: string) {
    const foundWallet = await this.userWalletsRepository.findByUserId(userId);

    if (foundWallet) {
      return foundWallet;
    }

    return this.userWalletsRepository.createOne({ _user: userId, amount: 0 });
  }

  public async getBallanceForUser(userId: string): Promise<number> {
    const foundWallet = await this.userWalletsRepository.findByUserId(userId);

    if (foundWallet) {
      return foundWallet.amount;
    }

    return 0;
    // throw new NotFoundException('ERR_NOT_FOUND_USER_WALLET_USER_ID');
  }

  public createWallet(createData: IUserWallet): Promise<IUserWallet> {
    return Promise.resolve(createData);
  }

  public async deductFromUser(userId: string, amount: number) {
    if (amount <= 0) {
      throw new BadRequestException('ERR_INVALID_AMOUNT');
    }

    const foundWallet = await this.ensureWalletForUser(userId);
    const currentBallance = foundWallet.amount;

    if (currentBallance < amount) {
      throw new ConflictException('ERR_LOW_BALLANCE');
    }

    return this.userWalletsRepository.update(
      { _user: userId, amount: { $gte: amount } },
      { $inc: { amount: -Number(amount) } },
    );
  }

  public async refillForUser(userId: string, amount: number) {
    if (amount <= 0) {
      throw new BadRequestException('ERR_INVALID_AMOUNT');
    }
    await this.ensureWalletForUser(userId);
    return this.userWalletsRepository.update({ _user: userId }, { $inc: { amount } });
  }
}
