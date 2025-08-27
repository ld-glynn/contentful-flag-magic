import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { VariantBadge } from './VariantBadge';
import { ContentfulEntry } from '@/lib/mockData';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';

interface ResolvedEntryProps {
  entry: ContentfulEntry | null;
  entryId: string | null;
  flagKey: string;
  variationName: string;
  variationIndex: number;
  isPreview?: boolean;
  showMapping?: boolean;
}

export const ResolvedEntry: React.FC<ResolvedEntryProps> = ({
  entry,
  entryId,
  flagKey,
  variationName,
  variationIndex,
  isPreview = false,
  showMapping = false
}) => {
  if (!entry) {
    return (
      <Card className="card-gradient border-destructive/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              No Content Found
            </CardTitle>
            <VariantBadge
              flagKey={flagKey}
              variationName={variationName}
              variationIndex={variationIndex}
            />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No content mapped to this variation
          </p>
          {showMapping && entryId && (
            <Badge variant="outline" className="mt-2 font-mono text-xs">
              Entry ID: {entryId}
            </Badge>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-gradient border-primary/20 relative overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">
              {entry.fields.title || 'Untitled Content'}
            </CardTitle>
            {isPreview && (
              <Badge variant="secondary" className="text-xs">
                PREVIEW
              </Badge>
            )}
          </div>
          <VariantBadge
            flagKey={flagKey}
            variationName={variationName}
            variationIndex={variationIndex}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {entry.fields.image && (
          <div className="relative rounded-lg overflow-hidden bg-muted">
            <img
              src={entry.fields.image.fields.file.url}
              alt={entry.fields.image.fields.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="text-xs bg-black/70 text-white">
                <ImageIcon className="w-3 h-3 mr-1" />
                Image
              </Badge>
            </div>
          </div>
        )}

        {entry.fields.description && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {entry.fields.description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          {entry.fields.ctaText && (
            <Button variant="hero" size="sm" className="flex-1">
              {entry.fields.ctaText}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          )}
          
          {showMapping && (
            <Button variant="outline" size="sm" className="font-mono text-xs">
              ID: {entry.sys.id}
            </Button>
          )}
        </div>

        {showMapping && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">
              Content Mapping
            </h4>
            <div className="space-y-1 text-xs font-mono">
              <div>Entry ID: <span className="text-primary">{entry.sys.id}</span></div>
              <div>Flag: <span className="text-accent">{flagKey}</span></div>
              <div>Variation: <span className="text-secondary-foreground">{variationName} (index: {variationIndex})</span></div>
            </div>
          </div>
        )}
      </CardContent>

      {/* Subtle glow effect for active content */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
    </Card>
  );
};