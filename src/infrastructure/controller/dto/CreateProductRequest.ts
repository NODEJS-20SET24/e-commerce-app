import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductRequest {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Teclado mecánico',
  })
  name: string;
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Id de la BD del proveedor',
    example: 1,
    minimum: 1,
    maximum: 99999999,
  })
  supplierId: number;
}
