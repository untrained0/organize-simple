import { Test, TestingModule } from '@nestjs/testing';
import { PdfParsersController } from './pdf-parser.controller';
import { PdfParserService } from './pdf-parser.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';

describe('PdfParserController', () => {
  let controller: PdfParsersController;
  let service: PdfParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfParsersController],
      providers: [PdfParserService],
      imports: [ConfigModule.forRoot(), HttpModule],
    }).compile();

    controller = module.get<PdfParsersController>(PdfParsersController);
    service = module.get<PdfParserService>(PdfParserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a PdfParserUploadResultDto from an Uploaded Pdf file', async () => {
    const text = 'test';
    const mockFile: Express.Multer.File = {
      originalname: 'test.pdf',
      buffer: Buffer.from(text),
      mimetype: 'application/pdf',
      size: 5 * 1024 * 1024,
      encoding: 'utf8',
      fieldname: 'file',
      destination: '',
      filename: '',
      path: '',
      stream: null,
    };

    const ParseResult = Promise.resolve(text);

    const responseResult = {
      originalFileName: mockFile.originalname,
      content: text,
    };

    jest.spyOn(service, 'parsePdf').mockImplementation(async () => ParseResult);
    expect(await controller.parsePdfFromUpload(mockFile)).toEqual(
      responseResult,
    );
  });

  it('should throw a UnProcessableEntityException from an invalid uploaded PDF file', async () => {
    const text = 'test';
    const mockFile: Express.Multer.File = {
      originalname: 'test.pdf',
      buffer: Buffer.from(text),
      mimetype: 'application/pdf',
      size: 5 * 1024 * 1024,
      encoding: 'utf8',
      fieldname: 'file',
      destination: '',
      filename: '',
      path: '',
      stream: null,
    };

    await expect(controller.parsePdfFromUpload(mockFile)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });

  // it('should return a PdfParseUrlResultDto from a uploaded PDF file through url', async () => {
  //   const url =
  //     'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  //   const responseResult = {
  //     originalFileName: url,
  //     content: 'Dummy PDF file',
  //   };

  //   expect(await controller.ParsePdfFromUrl({ url: url })).toEqual(
  //     responseResult,
  //   );
  // });

  // it('should return a UnProcessableEntityException from a unsearchable uploaded PDF file through url', async () => {
  //   const url =
  //     'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  //   expect(await controller.ParsePdfFromUrl({ url: url })).rejects.toThrow(
  //     UnprocessableEntityException,
  //   );
  // });

  // it('should return a BadRequestException from an invalid file extension', async () => {
  //   const url =
  //     'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.jpg';

  //   expect(await controller.ParsePdfFromUrl({ url: url })).rejects.toThrow(
  //     BadRequestException,
  //   );
  // });

  // it('should return a BadRequestException for a .pdf file not having its magic number', async () => {
  //   const url =
  //     'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.jpg.pdf';

  //   expect(await controller.ParsePdfFromUrl({ url: url })).rejects.toThrow(
  //     BadRequestException,
  //   );
  // });
});
