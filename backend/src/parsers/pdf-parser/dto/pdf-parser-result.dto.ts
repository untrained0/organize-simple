import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

class UploadResultDto {
  @ApiProperty({
    description: 'Original file name of the uploaded file',
  })
  originalFileName: string;
}

export class PdfParserResultDto {
  @ApiProperty({
    description: 'parsed and post-processed content of the pdf file',
  })
  content: string;
}

class UrlResultDto {
  @ApiProperty({
    description: 'Original URL of the pdf file',
  })
  @IsUrl()
  originalUrl: string;
}

export class PdfParserUploadResultDto extends IntersectionType(
  PdfParserResultDto,
  UploadResultDto,
) {}

export class PdfParserUrlResultDto extends IntersectionType(
  PdfParserResultDto,
  UrlResultDto,
) {}
