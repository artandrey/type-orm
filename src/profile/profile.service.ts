import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  findAll(): Promise<Profile[]> {
    return this.profilesRepository.find();
  }

  findOne(id: string): Promise<Profile> {
    return this.profilesRepository.findOne(id as any);
  }

  create(profile: Profile): Promise<Profile> {
    return this.profilesRepository.save(profile);
  }

  async update(id: string, profile: Profile): Promise<Profile> {
    await this.profilesRepository.update(id, profile);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.profilesRepository.delete(id);
  }
}
