import { Buffer } from 'buffer';

export const readFileAsBuffer = (file: File): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = Buffer.from(reader.result as string);
      resolve(buffer);
    };
    reader.onerror = (err: unknown) => {
      reject(err);
    };
    reader.readAsArrayBuffer(file);
  });
};
