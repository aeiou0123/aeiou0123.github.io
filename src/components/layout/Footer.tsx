'use client';

import { useEffect } from 'react';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { useMessages } from '@/lib/i18n/useMessages';

interface FooterProps {
  lastUpdated?: string;
  lastUpdatedByLocale?: Record<string, string | undefined>;
  defaultLocale?: string;
}

export default function Footer({ lastUpdated, lastUpdatedByLocale, defaultLocale = 'en' }: FooterProps) {
  const locale = useLocaleStore((state) => state.locale);
  const isZh = locale === 'zh';
  const messages = useMessages();

  useEffect(() => {
    if (document.getElementById('busuanzi-script')) {
      const bszCaller = (window as unknown as { bszCaller?: { fetch: () => void } }).bszCaller;
      if (bszCaller && typeof bszCaller.fetch === 'function') {
        bszCaller.fetch();
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'busuanzi-script';
    script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    document.body.appendChild(script);
  }, []);

  const resolvedLastUpdated =
    lastUpdatedByLocale?.[locale] ||
    (defaultLocale ? lastUpdatedByLocale?.[defaultLocale] : undefined) ||
    lastUpdated ||
    new Date().toLocaleDateString(locale || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <footer className="border-t border-neutral-200/50 bg-neutral-50/50 dark:bg-neutral-900/50 dark:border-neutral-700/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
            <span>
              {messages.footer.lastUpdated}: {resolvedLastUpdated}
            </span>
            <span
              id="busuanzi_container_site_pv"
              style={{ display: 'none' }}
              className="inline-flex items-center gap-1.5"
            >
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <span>{isZh ? '访问量' : 'Views'}:</span>
              <span id="busuanzi_value_site_pv" className="font-mono text-neutral-600 dark:text-neutral-400"></span>
            </span>
          </div>
          <p className="text-xs text-neutral-500 flex items-center">
            <a href="https://github.com/xyjoey/PRISM" target="_blank" rel="noopener noreferrer">
              {messages.footer.builtWithPrism}
            </a>
            <span className="ml-2">🚀</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
