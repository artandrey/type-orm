import { Entity, Column, OneToMany, ObjectIdColumn, ObjectId } from 'typeorm';
import { Book } from './book.entity';
import { Achievement } from './achievement.entity';
import { Questionnaire } from './questionare.entity';
import { Author } from './authro.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Profile {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  surname: string;

  @OneToMany(() => Book, (book) => book.profile)
  @ApiProperty({ isArray: true, type: () => Book })
  readBooks: Book[];

  @OneToMany(() => Book, (book) => book.profile)
  @ApiProperty({ isArray: true, type: () => Book })
  readingList: Book[];

  @Column(() => Author)
  @ApiProperty()
  favouriteAuthor: Author;

  @Column('simple-array')
  @ApiProperty()
  favouriteGenres: string[];

  @OneToMany(() => Achievement, (achievement) => achievement.profile, {
    cascade: true,
  })
  @ApiProperty({ type: () => Achievement, isArray: true })
  achievements: Achievement[];

  @Column(() => Questionnaire)
  @ApiProperty()
  questionnaire: Questionnaire;
}
