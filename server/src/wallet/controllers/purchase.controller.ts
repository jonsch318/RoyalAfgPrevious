import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PurchaseService } from '../services/purchase.service';
import { JwtAuthGuard } from '../../auth/strategies/jwt-auth.guard';
import { WalletService } from '../services/wallet.service';

@Controller('api/wallet')
export class PurchaseController {
  constructor(
    private readonly _purchaseService: PurchaseService,
    private readonly _walletService: WalletService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async balance(@Req() req) {
    return await this._walletService.findOne(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('purchase')
  async purchase(@Req() req, @Body('amount') amount: number) {
    return await this._purchaseService.purchase(req.user, amount);
  }

  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  async deposit(@Req() req, @Body('amount') amount: number) {
    return await this._purchaseService.deposit(req.user, amount);
  }
}
