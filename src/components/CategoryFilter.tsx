import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  resourceCounts: Record<string, number>;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  resourceCounts 
}: CategoryFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Categories</h3>
      <div className="space-y-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'ghost'}
          onClick={() => onCategoryChange('all')}
          className="w-full justify-between text-left"
        >
          All Resources
          <Badge variant="secondary">
            {Object.values(resourceCounts).reduce((sum, count) => sum + count, 0)}
          </Badge>
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'ghost'}
            onClick={() => onCategoryChange(category)}
            className="w-full justify-between text-left"
          >
            {category}
            <Badge variant="secondary">
              {resourceCounts[category] || 0}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
}