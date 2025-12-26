import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Play, Download, Clock, Star, Eye } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'course';
  category: string;
  duration?: string;
  rating: number;
  views: number;
  thumbnail: string;
  author: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <ImageWithFallback 
            src={resource.thumbnail}
            alt={resource.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay with play button for videos */}
          {resource.type === 'video' && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="h-6 w-6 text-primary ml-1" />
                </div>
              </div>
            </div>
          )}
          
          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <Badge variant={resource.type === 'video' ? 'default' : 'secondary'} className="capitalize">
              {resource.type}
            </Badge>
          </div>
          
          {/* Level badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white/90">
              {resource.level}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-primary font-medium">{resource.category}</p>
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
            {resource.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {resource.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>by {resource.author}</span>
          <div className="flex items-center gap-4">
            {resource.duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {resource.duration}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {resource.views.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{resource.rating}</span>
          </div>
          
          <Button 
            size="sm" 
            variant={resource.type === 'pdf' ? 'outline' : 'default'}
            className="gap-2"
          >
            {resource.type === 'pdf' ? (
              <>
                <Download className="h-3 w-3" />
                Download
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                {resource.type === 'video' ? 'Watch' : 'Start'}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}