import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from 'src/entities/profile.entity';
import { plainToInstance } from 'class-transformer';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @Post()
  create(@Body() profile: Profile): Promise<Profile> {
    return this.profileService.create(plainToInstance(Profile, profile));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() profile: Profile): Promise<Profile> {
    return this.profileService.update(id, plainToInstance(Profile, profile));
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.profileService.remove(id);
  }
}
