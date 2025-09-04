import React from 'react';
import type { Article } from '../types';

interface ArticleListProps {
    articles: Article[];
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
    return (
        <div className="space-y-4">
             <h3 className="text-lg font-semibold text-blue-300 border-b border-blue-400/30 pb-2">
                Relevant Articles
            </h3>
            {articles.map((article, index) => (
                <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-blue-400/20">
                    <h4 className="font-bold text-blue-300">{article.title}</h4>
                    <p className="text-sm text-gray-300 mt-1">{article.summary}</p>
                </div>
            ))}
        </div>
    );
};
