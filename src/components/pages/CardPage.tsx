'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { CardPageConfig } from '@/types/page';
import { ChevronDown } from 'lucide-react';

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
                        className="self-start sm:self-auto text-xs font-medium text-neutral-500 hover:text-primary dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 cursor-pointer"
                    >
                        {allOpen ? '折叠全部 / Collapse All' : '展开全部 / Expand All'}
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
                                    <p className={`${embedded ? "text-sm" : "text-base"} text-accent font-medium mb-3`}>{item.subtitle}</p>
                                )}

                                {item.tags && (
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-0.5 rounded border border-neutral-100 dark:border-neutral-800">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

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
                                            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm sm:text-base">
                                                <ReactMarkdown components={markdownComponents}>
                                                    {item.content}
                                                </ReactMarkdown>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}

                            {isCollapsible && hasContent && !isOpen && (
                                <div
                                    onClick={() => toggleItem(index)}
                                    className="pt-2 text-xs text-neutral-400 hover:text-accent cursor-pointer transition-colors flex items-center gap-1 font-medium"
                                >
                                    <span>展开查看资料与大纲 / Click to expand</span>
                                    <ChevronDown className="w-3 h-3" />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
