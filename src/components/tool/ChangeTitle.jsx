import { useEffect } from 'react';

export function ChangeTitle(title) {
  useEffect(() => {
    document.title = `BookMarket | ${title}`;
  }, [title]);

  return null;
}
