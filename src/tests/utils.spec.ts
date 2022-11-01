import sharp from 'sharp';
import path from 'path';
import { isFileExist } from '../utilities/handleFile';

describe('Exist file', () => {
  it('The file does not exists in the images folder', async () => {
    const result = await isFileExist('noexistfile',"./images");
    expect(result).toBe(false);
  });

  it('The file exists in the images folder', async () => {
    const result = await isFileExist('fjord',"./images");
    expect(result).toBe(true);
  });
});

describe('RESIZE', () => {
  it('Get a sharp file.', async () => {
    const res = sharp(path.join('images/fjord.jpg'));
    expect(async () => {
      await res;
    }).not.toThrow();
  });
});