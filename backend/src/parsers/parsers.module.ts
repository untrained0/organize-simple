import { Module } from '@nestjs/common';
import { PdfParserService } from './pdf-parser/pdf-parser.service';
import { PdfParsersController } from './pdf-parser/pdf-parser.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PdfParsersController],
  providers: [PdfParserService],
})
export class ParsersModule {}
