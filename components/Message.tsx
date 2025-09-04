import React from 'react';
import type { ChatMessage, MessageContent } from '../types';
import { Author } from '../types';
import { ProteinViewer } from './ProteinViewer';
import { PdbDownloader } from './PdbDownloader';
import { ArticleList } from './ArticleList';
import { DrugTargetList } from './DrugTargetList';

interface MessageProps {
  message: ChatMessage;
}

const UserIcon = () => (
    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white shrink-0">
        U
    </div>
);

const AIIcon = () => (
    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white shrink-0">
        Dr
    </div>
);

const ContentRenderer: React.FC<{ contentPart: MessageContent }> = React.memo(({ contentPart }) => {
    switch (contentPart.type) {
        case 'pdb_visualization':
            return <ProteinViewer pdbId={contentPart.pdbId} actions={contentPart.actions} />;
        case 'downloader':
            return <PdbDownloader pdbContent={contentPart.pdbContent} filename={contentPart.filename} />;
        case 'article_list':
            return <ArticleList articles={contentPart.articles} />;
        case 'drug_target_list':
            return <DrugTargetList targets={contentPart.targets} pathogen={contentPart.pathogen} />;
        case 'text':
        default:
            return <p className="whitespace-pre-wrap">{contentPart.text}</p>;
    }
});

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.author === Author.USER;

  const containerClasses = `flex items-start gap-4 ${isUser ? 'flex-row-reverse' : ''}`;
  const bubbleClasses = `max-w-xl lg:max-w-2xl xl:max-w-3xl w-full p-4 rounded-xl shadow-md ${
    isUser
      ? 'bg-indigo-600 text-white rounded-br-none'
      : 'bg-gray-700 text-gray-200 rounded-bl-none'
  }`;

  return (
    <div className={containerClasses}>
      {isUser ? <UserIcon /> : <AIIcon />}
      <div className={bubbleClasses}>
        <div className="prose prose-invert prose-p:my-2 first:prose-p:mt-0 last:prose-p:mb-0 space-y-4">
           {message.content.map((part, index) => (
                <ContentRenderer key={index} contentPart={part} />
            ))}
        </div>
      </div>
    </div>
  );
};
