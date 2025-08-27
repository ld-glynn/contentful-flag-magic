import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface VariantBadgeProps {
  flagKey: string;
  variationName: string;
  variationIndex: number;
  className?: string;
}

export const VariantBadge: React.FC<VariantBadgeProps> = ({
  flagKey,
  variationName,
  variationIndex,
  className
}) => {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "bg-primary/10 text-primary border-primary/30 font-mono text-xs",
        "backdrop-blur-sm shadow-glow-primary/20",
        className
      )}
    >
      {flagKey}:{variationName} ({variationIndex})
    </Badge>
  );
};