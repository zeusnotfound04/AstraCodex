import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{resource.title}</h3>
        {resource.url !== '#' && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{resource.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};