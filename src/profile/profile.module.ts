import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Profile } from 'src/entities/profile.entity';
import { Achievement } from 'src/entities/achievement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Book, Achievement])],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
