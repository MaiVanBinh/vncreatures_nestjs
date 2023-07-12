import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GetCreatureDto {
  @IsString()
  @IsOptional()
  q?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  @IsOptional()
  specie?: number[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  @IsOptional()
  group?: number[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  @IsOptional()
  family?: number[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  @IsOptional()
  set?: number[];

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isRedBook?: boolean;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page?: number;
}
