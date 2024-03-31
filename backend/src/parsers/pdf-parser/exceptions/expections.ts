export class PdfExtensionError extends Error {
  constructor() {
    super('The file extension is not .pdf');
  }
}

export class PdfSizeError extends Error {
  constructor() {
    super('The size of pdf is greater than 5MB');
  }
}

export class PdfMagicNumberError extends Error {
  constructor() {
    super('The file does not start with the Magic number: %PDF');
  }
}

export class PdfNotParsedError extends Error {
  constructor() {
    super('The file could not be parsed');
  }
}
