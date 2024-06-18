import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class Questionnaire {
  @ApiProperty()
  @Column()
  favouriteSeason: string;

  @ApiProperty()
  @Column()
  dateOfBirth: Date;

  @ApiProperty()
  @Column()
  favouriteWeekday: string;
}
