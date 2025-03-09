import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { SearchBar } from "./components/SearchBar";
import { ThemeToggle } from "./components/ThemeToggle";
import { ResourceCard } from "./components/ResourceCard";
import { categories } from "./data/categories";
import { resources } from "./data/resources";
import { Resource, Category } from "./types";
import Landing from "./components/Landing";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearchResult = (resource: Resource) => {
    console.log("Selected resource:", resource);
  };

  const findCategoryById = (id: string): Category | undefined => {
    const mainCategory = categories.find((cat) => cat.id === id);
    if (mainCategory) return mainCategory;

    for (const category of categories) {
      if (category.subcategories) {
        const subCategory = category.subcategories.find((sub) => sub.id === id);
        if (subCategory) return subCategory;
      }
    }
    return undefined;
  };

  const getResourcesForCategory = (categoryId: string): Resource[] => {
    const collectResources = (category: Category): Resource[] => {
      let collectedResources = resources.filter(resource => resource.category === category.id);

      if (category.subcategories) {
        for (const subcategory of category.subcategories) {
          collectedResources = collectedResources.concat(collectResources(subcategory));
        }
      }

      return collectedResources;
    };

    const category = findCategoryById(categoryId);
    return category ? collectResources(category) : [];
  };

  return (
    <Router>
      <Routes>
        {/* Landing Page (No Sidebar Layout) */}
        <Route path="/" element={<Landing />} />

        {/* Main App Layout (With Sidebar) */}
        <Route path="/*" element={
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            {/* Main Content Area */}
            <div className="lg:pl-64 overflow-x-hidden">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
                <div className="flex items-center justify-between px-4 py-4 max-w-[100vw]">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    <Menu className="w-6 h-6" />
                  </button>

                  <div className="flex-1 max-w-2xl mx-4">
                    <SearchBar onResultSelect={handleSearchResult} />
                  </div>

                  <ThemeToggle />
                </div>
              </div>

              {/* Page Content */}
              <main className="p-6">
                <Routes>
                  {categories.map((category) => (
                    <React.Fragment key={category.id}>
                      <Route
                        path={`/category/${category.id}`}
                        element={
                          <div className="max-w-[100vw]">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                              {category.name}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                              {category.description}
                            </p>
                            {category.subcategories ? (
                              category.subcategories.map((subcat) => (
                                <div key={subcat.id} className="mb-8">
                                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                                    {subcat.name}
                                  </h2>
                                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {getResourcesForCategory(subcat.id).map(
                                      (resource) => (
                                        <ResourceCard
                                          key={resource.id}
                                          resource={resource}
                                        />
                                      )
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {getResourcesForCategory(category.id).map(
                                  (resource) => (
                                    <ResourceCard
                                      key={resource.id}
                                      resource={resource}
                                    />
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        }
                      />

                      {category.subcategories?.map((subcat) => (
                        <Route
                          key={subcat.id}
                          path={`/category/${subcat.id}`}
                          element={
                            <div className="max-w-[100vw]">
                              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {subcat.name}
                              </h1>
                              <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {subcat.description}
                              </p>
                              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {getResourcesForCategory(subcat.id).map(
                                  (resource) => (
                                    <ResourceCard
                                      key={resource.id}
                                      resource={resource}
                                    />
                                  )
                                )}
                              </div>
                            </div>
                          }
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </Routes>
              </main>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
