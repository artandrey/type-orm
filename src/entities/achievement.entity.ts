import { Entity, Column, ManyToOne, ObjectIdColumn, ObjectId } from 'typeorm';
import { Profile } from './profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Achievement {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  date: Date;

  @ManyToOne(() => Profile, (profile) => profile.achievements)
  profile: Profile;
}
