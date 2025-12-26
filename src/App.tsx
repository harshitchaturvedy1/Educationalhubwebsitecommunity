import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ResourceCard, Resource } from './components/ResourceCard';
import { CategoryFilter } from './components/CategoryFilter';
import { ResourceFilters } from './components/ResourceFilters';
import { mockResources, categories } from './data/mockResources';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [typeFilter, setTypeFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    let filtered = mockResources;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(resource => resource.type === typeFilter);
    }

    // Level filter
    if (levelFilter !== 'all') {
      filtered = filtered.filter(resource => resource.level === levelFilter);
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'oldest':
        filtered.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, typeFilter, levelFilter]);

  // Calculate resource counts per category
  const resourceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(category => {
      counts[category] = mockResources.filter(resource => resource.category === category).length;
    });
    return counts;
  }, []);

  const hasActiveFilters = typeFilter !== 'all' || levelFilter !== 'all' || selectedCategory !== 'all';

  const clearFilters = () => {
    setSelectedCategory('all');
    setTypeFilter('all');
    setLevelFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                resourceCounts={resourceCounts}
              />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            {/* Filters */}
            <ResourceFilters
              sortBy={sortBy}
              onSortChange={setSortBy}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
              levelFilter={levelFilter}
              onLevelFilterChange={setLevelFilter}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Results header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Resources' : selectedCategory}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>
            </div>

            {/* Resource grid */}
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No resources found</div>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">EduHub</h3>
              <p className="text-gray-600 text-sm">
                Your comprehensive educational resource platform for learning anything, anywhere.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Video Courses</a></li>
                <li><a href="#" className="hover:text-primary">PDF Downloads</a></li>
                <li><a href="#" className="hover:text-primary">Interactive Courses</a></li>
                <li><a href="#" className="hover:text-primary">Certification</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Programming</a></li>
                <li><a href="#" className="hover:text-primary">Data Science</a></li>
                <li><a href="#" className="hover:text-primary">Design</a></li>
                <li><a href="#" className="hover:text-primary">Business</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            © 2025 EduHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}