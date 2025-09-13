export function getDocumentTitle(title?: string) {
  const defaultTitle = 'Pocketex';

  return title ? `${title} | ${defaultTitle}` : defaultTitle;
}
