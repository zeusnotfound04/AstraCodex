import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  WrenchIcon as Tool, 
  Search, 
  User, 
  Clock, 
  Globe, 
  BookOpen, 
  FolderOpen, 
  X, 
  RadarIcon, 
  Building2Icon, 
  CarFront, 
  Code2, 
  Drama as Mask,
  Database,
  Gamepad2
} from 'lucide-react';
import { categories } from '../data/categories';
import { Category } from '../types';
import GoogleAd from './GoogleAd';


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICON_MAP = {
  tool: Tool,
  search: Search,
  user: User,
  clock: Clock,
  globe: Globe,
  book: BookOpen,
  folder: FolderOpen,
  radar: RadarIcon,
  building: Building2Icon,
  car: CarFront,
  code: Code2,
  mask: Mask,
  database: Database,
  game: Gamepad2
};

const CategoryItem: React.FC<{ category: Category; isNested?: boolean }> = ({ category, isNested = false }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const IconComponent = ICON_MAP[category.icon as keyof typeof ICON_MAP];
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;

  return (
    <div className={`${isNested ? 'ml-4' : ''}`}>
      {hasSubcategories ? (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {IconComponent && <IconComponent className="w-5 h-5 mr-3" />}
            <span>{category.name}</span>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 ml-auto" />
            ) : (
              <ChevronRight className="w-4 h-4 ml-auto" />
            )}
          </button>
          {isExpanded && (
            <div className="mt-1">
              {category.subcategories.map((subcategory) => (
                <CategoryItem key={subcategory.id} category={subcategory} isNested />
              ))}
            </div>
          )}
        </div>
      ) : (
        <NavLink
          to={`/category/${category.id}`}
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-lg mb-1 ${
              isActive
                ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          {IconComponent && <IconComponent className="w-5 h-5 mr-3" />}
          <span>{category.name}</span>
        </NavLink>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">AstraCodeX</h2>
            <button onClick={onClose} className="lg:hidden">
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <nav>
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </nav>
        </div>
          <GoogleAd  slotId="5119802020"/>
        
      </aside>
    </>
  );
};
