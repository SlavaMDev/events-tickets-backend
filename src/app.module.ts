import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TicketModule } from './app/ticket/ticket.module';
import { AuthModule } from "./app/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    TicketModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
