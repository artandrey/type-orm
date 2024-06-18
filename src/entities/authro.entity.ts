import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class Author {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  surname: string;
}
