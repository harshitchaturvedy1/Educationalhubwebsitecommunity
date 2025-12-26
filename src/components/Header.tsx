import { Search, BookOpen, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function Header({ onSearch, searchQuery }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-gray-900">EduHub</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for courses, videos, PDFs..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#courses" className="text-gray-700 hover:text-primary transition-colors">Courses</a>
            <a href="#videos" className="text-gray-700 hover:text-primary transition-colors">Videos</a>
            <a href="#resources" className="text-gray-700 hover:text-primary transition-colors">Resources</a>
            <Button variant="outline">Sign In</Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}