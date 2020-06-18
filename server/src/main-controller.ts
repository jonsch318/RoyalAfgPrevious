import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Logger,
  HttpCode,
  Res,
  Get,
} from '@nestjs/common';

/**
 * Controller for the Authentication Processes
 */
@Controller('/')
export class MainController {
  @Get('/')
  async index() {
    return 'Hello World from RoyalAfg';
  }
}
