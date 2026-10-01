'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { CardPageConfig } from '@/types/page';
import { ChevronDown } from 'lucide-react';
import { useLocaleStore } from '@/lib/stores/localeStore';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li className="mb-1">{children}</li>,
    a: ({ ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        />
    ),
    blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
            {children}
        </blockquote>
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
    code: ({ children }: React.ComponentProps<'code'>) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.95em]">{children}</code>
    ),
};

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    const isCollapsible = Boolean(config.collapsible);
    const defaultCollapsed = Boolean(config.default_collapsed);
    const locale = useLocaleStore(state => state.locale);
    const isZh = locale === 'zh';

    const [openMap, setOpenMap] = useState<Record<number, boolean>>(() => {
        const initial: Record<number, boolean> = {};
        if (isCollapsible) {
            config.items.forEach((_, idx) => {
                initial[idx] = !defaultCollapsed;
            });
        }
        return initial;
    });

    const toggleItem = (idx: number) => {
        setOpenMap(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    const allOpen = config.items.every((_, idx) => openMap[idx]);

    const toggleAll = () => {
        const nextState = !allOpen;
        const updated: Record<number, boolean> = {};
        config.items.forEach((_, idx) => {
            updated[idx] = nextState;
        });
        setOpenMap(updated);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${embedded ? "mb-4" : "mb-8"}`}>
                <div>
                    <h1 className={`${embedded ? "text-2xl" : "text-4xl"} font-serif font-bold text-primary mb-3`}>{config.title}</h1>
                    {config.description && (
                        <div className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed`}>
                            <ReactMarkdown components={markdownComponents}>
                                {config.description}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {isCollapsible && config.items.length > 0 && (
                    <button
                        type="button"
                        onClick={toggleAll}
                        className="self-start sm:self-auto text-xs font-medium text-neutral-600 hover:text-primary dark:text-neutral-300 dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 cursor-pointer"
                    >
                        {allOpen ? (isZh ? '折叠全部' : 'Collapse All') : (isZh ? '展开全部' : 'Expand All')}
                    </button>
                )}
            </div>

            <div className={`grid ${embedded ? "gap-4" : "gap-6"}`}>
                {config.items.map((item, index) => {
                    const hasContent = Boolean(item.content);
                    const isOpen = isCollapsible ? Boolean(openMap[index]) : true;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.08 * index }}
                            className={`bg-white dark:bg-neutral-900 ${embedded ? "p-4" : "p-6"} rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-md transition-all duration-200`}
                        >
                            <div
                                onClick={isCollapsible && hasContent ? () => toggleItem(index) : undefined}
                                className={isCollapsible && hasContent ? "cursor-pointer select-none group" : ""}
                            >
                                <div className="flex justify-between items-start gap-4 mb-2">
                                    <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary group-hover:text-accent transition-colors flex items-center gap-2`}>
                                        {item.title}
                                        {isCollapsible && hasContent && (
                                            <ChevronDown
                                                className={`w-4 h-4 text-neutral-400 group-hover:text-accent transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                            />
                                        )}
                                    </h3>
                                    {item.date && (
                                        <span className="text-sm text-neutral-500 font-medium bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded whitespace-nowrap">
                                            {item.date}
                                        </span>
                                    )}
                                </div>

                                {item.subtitle && (
                                    <p className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-400 font-normal mb-2`}>{item.subtitle}</p>
                                )}

                                {item.tags && item.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-0.5 rounded border border-neutral-100 dark:border-neutral-800">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {item.link && (
                                <div className="mt-2 mb-3">
                                    {item.link.startsWith('/') ? (
                                        <Link
                                            href={item.link}
                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline hover:opacity-80 transition-opacity"
                                        >
                                            <span>{isZh ? '查看详情 →' : 'View Details →'}</span>
                                        </Link>
                                    ) : (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline hover:opacity-80 transition-opacity"
                                        >
                                            {item.link.includes('github.com') ? (
                                                <>
                                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                                    </svg>
                                                    <span>{isZh ? 'GitHub 仓库' : 'GitHub Repository'}</span>
                                                </>
                                            ) : (
                                                <span>{isZh ? '访问链接 →' : 'Visit Link →'}</span>
                                            )}
                                        </a>
                                    )}
                                </div>
                            )}

                            {hasContent && (
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 mt-2 text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm sm:text-base">
                                                <ReactMarkdown components={markdownComponents}>
                                                    {item.content}
                                                </ReactMarkdown>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
