import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

class PriceSubUnit {
  @ApiProperty()
  @IsInt()
  gte: number;

  @ApiProperty()
  @IsInt()
  lte: number;
}

export class GetFilterProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @Type(() => PriceSubUnit)
  price_subunit: PriceSubUnit;
}
