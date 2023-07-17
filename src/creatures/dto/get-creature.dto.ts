import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export type TClassifyLabel = 'groups' | 'sets' | 'family';

export enum ClassifyEnum {
  GROUP = 'groups',
  SETS = 'sets',
  FAMILY = 'family',
}

export class TClassify {
  @IsString()
  @IsEnum(ClassifyEnum)
  name: TClassifyLabel;

  @IsArray()
  @Type(() => Number)
  value?: number[];
}
export class GetCreatureDto {
  @IsString()
  @IsOptional()
  keyword?: string;

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

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  specie?: number;

  @IsObject()
  @ValidateNested()
  @Type(() => TClassify)
  @IsOptional()
  classify?: TClassify;
}
