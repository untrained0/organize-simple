import { Test, TestingModule } from '@nestjs/testing';
import { PdfParserService } from './pdf-parser.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import {
  PdfExtensionError,
  PdfMagicNumberError,
} from './exceptions/expections';

describe('PdfParserService', () => {
  let service: PdfParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfParserService],
      imports: [ConfigModule.forRoot(), HttpModule],
    }).compile();

    service = module.get<PdfParserService>(PdfParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('postProcessText', () => {
    it('should trim the lines and remove excess inner whitespacesto keep maximum of 3', async () => {
      const input = 'a    b       c d      ';
      const expected = 'a   b   c d';
      const result = service['postProcessText'](input);
      expect(result).toEqual(expected);
    });

    it('should keep only one empty line if multiple empty lines', async () => {
      const input = 'a\n\n\nb\n\n\n\nc\nd';
      const expected = 'a\n\nb\n\nc\nd';
      const result = service['postProcessText'](input);
      expect(result).toEqual(expected);
    });
  });

  describe('loadPdfFromUrl', () => {
    it('should load the pdf from url and parse it', async () => {
      const url =
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
      const buffer = await service.loadPdfFromUrl(url);

      const expected = 'Dummy PDF file';
      const result = await service.parsePdf(buffer);

      expect(result).toEqual(expected);
    });

    it('should throw an error if not a pdf extension', async () => {
      const url =
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.jpg';

      await expect(service.loadPdfFromUrl(url)).rejects.toThrowError(
        PdfExtensionError,
      );
    });

    // it('should throw an error if file does not have pdf magic number', async () => {
    //   const url =
    //     'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.jpg';

    //   await expect(service.loadPdfFromUrl(url)).rejects.toThrowError(
    //     PdfMagicNumberError,
    //   );
    // });
  });
});
