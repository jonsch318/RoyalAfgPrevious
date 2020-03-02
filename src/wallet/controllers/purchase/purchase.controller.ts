import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { JwtAuthGuard } from '../../../auth/strategies/jwt-auth.guard';

@Controller('api/wallet')
export class PurchaseController {

  constructor(private readonly _purchaseService: PurchaseService) {

  }

  @UseGuards(JwtAuthGuard)
  @Post("purchase")
  purchase(@Req() req, @Body("amount") amount: number){
    return this._purchaseService.purchase(req.user, amount);
  }



}
