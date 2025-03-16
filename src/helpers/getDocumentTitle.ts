import { type Optional } from '@/models/utils';

export function getDocumentTitle(title: Optional<string>) {
  const defaultTitle = 'Pocketex';

  return title ? `${title} | ${defaultTitle}` : defaultTitle;
}
