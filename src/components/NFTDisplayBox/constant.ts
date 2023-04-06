type IMAGE_TYPE =
  | 'application/json' // iframe
  | 'application/pdf' // iframe
  | 'application/pgp-signature' // iframe
  | 'application/yaml' // iframe
  | 'audio/flac' // iframe
  | 'model/gltf-binary' // iframe
  | 'model/stl' // iframe
  | 'text/html;charset=utf-8' // iframe
  | 'text/plain;charset=utf-8' // iframe
  | 'audio/mpeg' // https://www.w3schools.com/html/html5_audio.asp
  | 'audio/wav' // https://www.w3schools.com/html/html5_audio.asp
  | 'image/apng' // Image
  | 'image/avif' // Image
  | 'image/gif' // Image
  | 'image/jpeg' // Image
  | 'image/png' // Image
  | 'image/svg' // Image
  | 'image/svg+xml' // Image
  | 'image/webp' // Image
  | 'link/https' // Image
  | 'video/mp4' // https://www.w3schools.com/html/html5_video.asp
  | 'video/webm'; // https://www.w3schools.com/html/html5_video.asp

export type { IMAGE_TYPE };
