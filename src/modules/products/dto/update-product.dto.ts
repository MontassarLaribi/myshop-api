import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length, IsNumber } from 'class-validator';
import { ObjectID } from 'mongodb';

export class UpdateProductDto {
  @ApiProperty()
  _id?: ObjectID;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Length(3, 80)
  readonly title: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly price: number;
}
