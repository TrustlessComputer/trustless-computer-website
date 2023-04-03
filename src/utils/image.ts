const isUrl = (url: string): boolean => {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
};

export const convertIpfsToHttp = (uri: string, base?: string): string => {
  if (!uri) return '';
  if (isUrl(uri)) {
    return String(uri)
      .replace('https://ipfs.io/ipfs/', 'https://cloudflare-ipfs.com/ipfs/')
      .replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/');
  } else {
    const url = `${base || 'https://cloudflare-ipfs.com/ipfs'}/${uri}`;
    return url;
  }
};

export const isSvgUrl = async (url: string) => {
  const r = await fetch(url, { method: 'HEAD' });
  return r.headers.get('content-type') === 'image/svg+xml';
};

export const isValidImage = (url: string): Promise<boolean> =>
  new Promise(resolve => {
    const img = new Image();

    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
