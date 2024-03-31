import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class PdfParserRequestDto {
  @ApiProperty({
    description: 'The url of the pdf file to be parsed',
  })
  @IsUrl()
  url: string;
}
