import sharp, { Sharp } from 'sharp';
import { readdirSync } from 'fs';

export const resize = async (
  fileSource: string,
  width: string,
  height: string,
): Promise<Sharp | undefined> => {
  const getFile = `./images/${fileSource}.jpg`;
  try {
    const res = await sharp(getFile);
    if (width && height && parseInt(width) > 0 && parseInt(height) > 0) {
      const resizeParams = {
        width: parseInt(width),
        height: parseInt(height),
      };
      res.resize(resizeParams);
    }
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const isFileExist = async (
  filename: string,
  folderPath: string,
): Promise<boolean> => {
  const files = await readdirSync(folderPath);
  const names = files.map((file) => file.split('.')[0]);
  return names.includes(filename);
};
