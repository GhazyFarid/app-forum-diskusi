import DOMPurify from 'dompurify';

export function htmlPreview(html, limit = 140) {
  const cleanHtml = DOMPurify.sanitize(html);

  const doc = new DOMParser().parseFromString(cleanHtml, 'text/html');
  const text = doc.body.textContent || '';
  const words = text.split(/\s+/).filter(Boolean);

  if (words.length <= limit) return text;

  return `${words.slice(0, limit).join(' ')} ...`;
}

export function safeHtml(html = '') {
  return {
    __html: DOMPurify.sanitize(html),
  };
}
