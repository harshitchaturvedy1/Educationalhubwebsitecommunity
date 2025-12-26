import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Filter, X } from "lucide-react";

interface ResourceFiltersProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  levelFilter: string;
  onLevelFilterChange: (level: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function ResourceFilters({
  sortBy,
  onSortChange,
  typeFilter,
  onTypeFilterChange,
  levelFilter,
  onLevelFilterChange,
  onClearFilters,
  hasActiveFilters,
}: ResourceFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={typeFilter} onValueChange={onTypeFilterChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="video">Videos</SelectItem>
          <SelectItem value="pdf">PDFs</SelectItem>
          <SelectItem value="course">Courses</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={levelFilter} onValueChange={onLevelFilterChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="Beginner">Beginner</SelectItem>
          <SelectItem value="Intermediate">Intermediate</SelectItem>
          <SelectItem value="Advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
      
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="gap-2"
        >
          <X className="h-3 w-3" />
          Clear Filters
        </Button>
      )}
    </div>
  );
}