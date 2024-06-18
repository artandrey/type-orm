import { Entity, Column, ManyToOne, ObjectId, ObjectIdColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Book {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @ApiProperty()
  title: string;

  @ManyToOne(() => Profile, (profile) => profile.readBooks)
  profile: Profile;
}
