'use client';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function MetadataTitle() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('title');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('description'));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = t('description');
      document.head.appendChild(meta);
    }
  }, [t]);

  return null;
}
