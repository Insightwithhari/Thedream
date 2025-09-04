import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { Message } from './Message';
import { Author } from '../types';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onSendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-6 overflow-y-auto pr-2 pb-4">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        {isLoading && (
            <Message message={{id: 'loading', author: Author.AI, content: [{type: 'text', text: 'Thinking...'}] }} />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 pt-4 border-t border-blue-400/30 flex items-center shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask Dr. Rhesus a question..."
          aria-label="Chat input"
          className="flex-1 bg-gray-800 border border-gray-600 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          aria-label="Send message"
          className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        </button>
      </div>
    </div>
  );
};
