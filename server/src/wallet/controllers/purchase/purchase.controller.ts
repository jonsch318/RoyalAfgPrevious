import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { JwtAuthGuard } from '../../../auth/strategies/jwt-auth.guard';
import { WalletService } from '../../services/wallet/wallet.service';

/**
 * Controller for the transactions to and from the wallet
 */
@Controller('api/wallet')
export class PurchaseController {

  constructor(
    private readonly _purchaseService: PurchaseService,
    private readonly _walletService: WalletService
  ) {

  }

  /**
   * Route /api/wallet. Gets the wallet and returns it
   * @param req The request object. Contains the user.
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async balance(@Req() req){
    return await this._walletService.findOne(req.user);
  }

  /**
   * Route /api/wallet/purchase. Makes a purchase transaction
   * @param req The request object. Contains the authenticated user.
   * @param amount The  amount removed form the users wallet.
   */
  @UseGuards(JwtAuthGuard)
  @Post("purchase")
  async purchase(@Req() req, @Body("amount") amount: number){
    return await this._purchaseService.purchase(req.user, amount);
  }

  /**
   * Route /api/wallet/deposit. Makes a deposit transaction.
   * @param req The request object. Contains the authenticated user.
   * @param amount The amount to be added to the users wallet.
   */
  @UseGuards(JwtAuthGuard)
  @Post("deposit")
  async deposit(@Req() req, @Body("amount") amount: number){
    return await this._purchaseService.deposit(req.user, amount);
  }

}
