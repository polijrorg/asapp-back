import { Document } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import mime from 'mime';
import fs from 'fs';
import multerConfig from '@config/multer';
import AppError from '@shared/errors/AppError';
import AWS, { S3 } from 'aws-sdk';
import IDocumentsRepository from '../repositories/IDocumentsRepository';

enum DocType {
    CPF = 'CPF',
    RG = 'RG',
    PASSPORT ='PASSPORT'
}

interface IRequest {
    type: DocType;
    issuing_authority:string;
    number: string;
    expiration_date: Date;
    user_id: string;
    files: { [fieldname: string]: Express.Multer.File[]; };
}

@injectable()
export default class CreateDocumentService {
  constructor(
    @inject('DocumentsRepository')
    private documentsRepository: IDocumentsRepository,

    private S3Client: S3 = new AWS.S3({ region: process.env.AWS_DEFAULT_REGION })
  ) {}

  public async execute({
    files, ...dataWithoutFiles
  }: IRequest): Promise<Document> {
    const documentWithSameNumber = await this.documentsRepository.findByNumber(dataWithoutFiles.number);

    if (documentWithSameNumber) {
      throw new AppError('Document with same number already exists');
    }

    if (!files.front || !files.back) {
      throw new AppError('Missing document pictures');
    }

    const front = files.front[0].filename;
    const back = files.back[0].filename;

    await this.uploadImage(front);
    await this.uploadImage(back);

    const document = await this.documentsRepository.create({ ...dataWithoutFiles, front, back });

    return document;
  }

  private async uploadImage(filename: string): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, filename);
    const ContentType = mime.getType(originalPath);

    if (!ContentType) throw new AppError('File not found!', 400);
    const fileContent = await fs.promises.readFile(originalPath);

    await this.S3Client.putObject({
      Bucket: process.env.BUCKET_NAME as string,
      Key: filename,
      Body: fileContent,
      ContentType,
    }).promise();

    await fs.promises.unlink(originalPath);
  }
}
