import FileType from 'file-type/browser';
import { IMAGE_EXTENSIONS, NAIVE_MIMES, SUPPORTED_FILE_EXT, SUPPORT_INSCRIBE_IMAGE } from '@/constants/file';
import { unzip } from 'unzipit';
import { MASOX_SYSTEM_PREFIX } from '@/constants/sandbox';
import { MediaType } from '@/enums/file';
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

export function getNaiveMimeType(filename: string): string | false {
  const ext = filename.split('.').pop();
  return (ext && NAIVE_MIMES[ext]) || false;
}

export async function unzipFile(file: File): Promise<Record<string, Blob>> {
  const { entries } = await unzip(file);

  const blobs: Record<string, Blob> = {};
  for (const name in entries) {
    // Ignore system files
    if (MASOX_SYSTEM_PREFIX.some((systemFileName: string) => name.includes(systemFileName))) {
      continue;
    }

    // Ignore directories
    if (entries[name].isDirectory) {
      continue;
    }

    let mime = getNaiveMimeType(name);
    if (!mime) {
      const buffer = await entries[name].arrayBuffer();
      const type = await FileType.fromBuffer(buffer);
      if (type) {
        mime = type.mime;
      }
    }
    blobs[name] = await entries[name].blob(mime || undefined);
  }

  return blobs;
}

export const getFileExtensionByFileName = (fileName: string): string | null => {
  const fileExt = fileName.split('.').pop();
  return fileExt ?? null;
};

export const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const blobToFile = (fileName: string, fileBlob: Blob): File => {
  return new File([fileBlob], fileName, {
    type: fileBlob.type,
  });
};

export const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const getSupportedFileExtList = (): Array<string> => {
  return SUPPORTED_FILE_EXT.map(item => item.ext);
};

export const getMediaTypeFromFileExt = (ext: string): MediaType | null => {
  const supportedFile = SUPPORTED_FILE_EXT.find(item => {
    return item.ext.toLowerCase() === ext.toLowerCase();
  });
  if (supportedFile) {
    return supportedFile.mediaType;
  }
  return null;
};

export const getFileNameFromUrl = (url: string): string => {
  return url.substring(url.lastIndexOf('/') + 1, url.length);
};

export const isImageFile = (file: File): boolean => {
  const fileName = file.name;
  const fileExt = getFileExtensionByFileName(fileName);
  if (!fileExt) {
    return false;
  }
  return IMAGE_EXTENSIONS.includes(fileExt);
};

export const isInscribeImageFile = (file: File): boolean => {
  const fileName = file.name;
  const fileExt = getFileExtensionByFileName(fileName);
  if (!fileExt) {
    return false;
  }
  return SUPPORT_INSCRIBE_IMAGE.includes(fileExt);
};

export const readFileAsText = (file: File | Blob): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsText(file);
  });
};
