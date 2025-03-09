import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import Fuse from 'fuse.js';
import { resources } from '../data/resources';
import { Resource } from '../types';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onResultSelect: (resource: Resource) => void;
}

const fuseOptions = {
  keys: [
    { name: 'title', weight: 1 },
    { name: 'description', weight: 0.7 },
    { name: 'tags', weight: 0.5 },
    { name: 'category', weight: 0.3 }
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2
};

export const SearchBar: React.FC<SearchBarProps> = ({ onResultSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Fuse.FuseResult<Resource>[]>([]);
  const navigate = useNavigate();

  const fuse = new Fuse(resources, fuseOptions);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.length > 1) {
      const searchResults = fuse.search(value);
      setResults(searchResults.slice(0, 8)); // Limit to top 8 results
    } else {
      setResults([]);
    }
  }, []);

  const handleSelect = (result: Fuse.FuseResult<Resource>) => {
    onResultSelect(result.item);
    setQuery('');
    setResults([]);
    navigate(`/category/${result.item.category}`);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search resources..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>
      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.item.id}
              onClick={() => handleSelect(result)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 border-b last:border-b-0 border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">{result.item.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{result.item.description}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {result.item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {result.score && (
                  <div className="ml-4 text-sm text-gray-400">
                    {Math.round((1 - result.score) * 100)}% match
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};