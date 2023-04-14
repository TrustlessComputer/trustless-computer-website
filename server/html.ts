import { load } from 'cheerio';
import path from 'path';
import fs from 'fs';

const indexHtml = fs.readFileSync(path.join(__dirname, '../dist/index.html')).toString();

interface IBuildHtmlPayload {
  title?: string;
  description?: string;
  image?: string;
}

export const buildHtml = ({ title, description, image }: IBuildHtmlPayload) => {
  const $ = load(indexHtml);

  if (title) {
    $('title').text(title);
    $('meta[property~=og:title]').attr("content", title);
    $('meta[property~=twitter:title]').attr("content", title);
  }

  if (description) {
    $('meta[property~=og:description]').attr("content", description);
    $('meta[property~=twitter:description]').attr("content", description);
  }

  if (image) {
    $('meta[property~=og:image]').attr("content", image);
    $('meta[property~=twitter:image]').attr("content", image);
  }

  return $.html();
}
