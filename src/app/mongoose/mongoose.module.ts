import { Module } from '@nestjs/common';
import { MongooseModule as Mongoose } from '@nestjs/mongoose';

@Module({
    imports: [
        Mongoose.forRoot(process.env.MONGO_DB_ROOT || ''),
    ],
})
export class MongooseModule {}
