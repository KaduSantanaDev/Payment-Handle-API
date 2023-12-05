import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    OrderModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
