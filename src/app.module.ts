import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './entities/profile.entity';
import { Book } from './entities/book.entity';
import { Achievement } from './entities/achievement.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://user:Mongo12345678db@cluster0.6vh98.mongodb.net/?retryWrites=true&w=majority&appName=typeorm',
      synchronize: true,
      entities: [Profile, Book, Achievement],
    }),
    ProfileModule,
  ],
  controllers: [],
})
export class AppModule {}
