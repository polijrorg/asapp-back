import multer from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

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
};

export default multerConfig;
