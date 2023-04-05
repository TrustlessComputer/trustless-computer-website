export const readFileAsBuffer = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result;
      resolve(buffer);
    };
    reader.onerror = (err: unknown) => {
      reject(err);
    };
    reader.readAsArrayBuffer(file);
  });
};
