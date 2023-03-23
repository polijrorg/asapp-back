import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export const fileSizeLimit = 10 * 1024 * 1024;

const multerConfig = {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      const fileHash = `${Date.now()}`;
      const fileName = `${fileHash}-${file.originalname.replace(/\s/g, '')}`;

      return callback(null, fileName);
    },
  }),
  limits: {
    fileSize: fileSizeLimit
  }
};

export default multerConfig;
