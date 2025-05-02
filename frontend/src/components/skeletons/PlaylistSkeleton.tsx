import React from "react";

const PlaylistSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse p-4">
      {/* Header Skeleton */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>

      {/* Songs List Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistSkeleton;
