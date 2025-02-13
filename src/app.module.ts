import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './app/user/user.module';
import { TicketModule } from './app/ticket/ticket.module';
import { AuthModule } from "./app/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_ROOT || ''),
    UserModule,
    TicketModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
