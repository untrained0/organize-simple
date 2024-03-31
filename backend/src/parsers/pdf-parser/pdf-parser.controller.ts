import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  // Get,
  ParseFilePipeBuilder,
  Post,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { PdfParserService } from './pdf-parser.service';
import {
  PdfParserUploadResultDto,
  PdfParserUrlResultDto,
} from './dto/pdf-parser-result.dto';
import { PdfParserRequestDto } from './dto/pdf-parser-request.dto';
import { PdfNotParsedError } from './exceptions/expections';

const uploadSchema = {
  type: 'object',
  properties: {
    file: {
      type: 'string',
      format: 'binary',
    },
  },
};

const pdfPipe = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: 'pdf',
  })
  .addMaxSizeValidator({
    maxSize: 1024 * 1024 * 5, // 5 MB
  })
  .build({
    fileIsRequired: true,
  });

@ApiUnauthorizedResponse({
  description: 'The API key in the request header is invalid or missing.',
})
@ApiBadRequestResponse({
  description: 'The request body or the uploaded file is invalid or missing.',
})
@ApiUnprocessableEntityResponse({
  description: 'The PDF file is not searchable.',
})
@ApiSecurity('apiKey')
@ApiTags('parsers')
@Controller({ path: 'parsers/pdf', version: '1.0.0' })
export class PdfParsersController {
  constructor(private readonly pdfParserService: PdfParserService) {}

  @ApiOperation({
    summary: 'Return text from the PDF file',
    description: `This endpoint retrieves the content of the uploaded PDF file and returns it as text\n
    The file must be a searchable PDF file with a maximum size of 5MB.
    It's buffer need to start with its magic number : "%PDF" to be parsed`,
  })
  @ApiOkResponse({
    type: PdfParserUploadResultDto,
    description:
      'The PDF file was successfully uploaded. Its content is return as text.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: uploadSchema, description: 'PDF file to be parsed' })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  @HttpCode(200)
  async parsePdfFromUpload(
    @UploadedFile(pdfPipe) file: Express.Multer.File,
  ): Promise<PdfParserUploadResultDto> {
    try {
      const text = await this.pdfParserService.parsePdf(file.buffer);
      return {
        originalFileName: file.originalname,
        content: text,
      };
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @ApiOperation({
    summary: 'Return text from the PDF file provided by URL',
    description: `This endpoint retrieves the content of the PDF file through URL and returns it as text\n
    The file must be a searchable PDF file with a maximum size of 5MB.
    It's buffer need to start with its magic number : "%PDF" to be parsed`,
  })
  @ApiOkResponse({
    type: PdfParserUploadResultDto,
    description:
      'The PDF file was successfully uploaded. Its content is return as text.',
  })
  @Post('url')
  @HttpCode(200)
  async ParsePdfFromUrl(
    @Body() requestDto: PdfParserRequestDto,
  ): Promise<PdfParserUrlResultDto> {
    try {
      const file = await this.pdfParserService.loadPdfFromUrl(requestDto.url);
      const text = await this.pdfParserService.parsePdf(file);

      return {
        originalUrl: requestDto.url,
        content: text,
      };
    } catch (error) {
      if (error instanceof PdfNotParsedError) {
        throw new UnprocessableEntityException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
