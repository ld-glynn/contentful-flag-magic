import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockFlags, type LDFlag } from '@/lib/mockData';
import { Flag, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface FlagSelectorProps {
  selectedFlagKey: string | null;
  onFlagSelect: (flagKey: string) => void;
}

export const FlagSelector: React.FC<FlagSelectorProps> = ({
  selectedFlagKey,
  onFlagSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const filteredFlags = mockFlags.filter(flag => 
    flag.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedFlag = mockFlags.find(f => f.key === selectedFlagKey);

  return (
    <Card className="card-gradient border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Flag className="w-5 h-5" />
          Feature Flag
        </CardTitle>
        <CardDescription>
          Select a flag to see content variations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search flags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Selected Flag Display */}
        {selectedFlag && (
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">{selectedFlag.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-6 w-6 p-0"
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
            <Badge variant="outline" className="font-mono text-xs">
              {selectedFlag.key}
            </Badge>
            
            {isExpanded && (
              <div className="mt-3 space-y-2">
                <div className="text-xs text-muted-foreground">Variations:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedFlag.variations.map((variation, index) => (
                    <Badge
                      key={index}
                      variant={index === selectedFlag.defaultVariation ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {variation.name} ({index})
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Flag List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Available Flags ({filteredFlags.length})
          </div>
          
          {filteredFlags.map((flag) => (
            <Button
              key={flag.key}
              variant={selectedFlagKey === flag.key ? "secondary" : "ghost"}
              className="w-full justify-start text-left h-auto p-3"
              onClick={() => onFlagSelect(flag.key)}
            >
              <div className="w-full">
                <div className="font-medium text-sm mb-1">{flag.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{flag.key}</div>
                <div className="flex gap-1 mt-2">
                  {flag.variations.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === flag.defaultVariation
                          ? 'bg-primary'
                          : 'bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Button>
          ))}

          {filteredFlags.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              <Flag className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div className="text-sm">No flags found</div>
              <div className="text-xs">Try a different search term</div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="pt-2 border-t border-border/50">
          <div className="text-xs text-muted-foreground mb-2">Quick Select:</div>
          <div className="flex flex-wrap gap-1">
            {mockFlags.slice(0, 2).map((flag) => (
              <Button
                key={flag.key}
                variant="outline"
                size="sm"
                onClick={() => onFlagSelect(flag.key)}
                className="text-xs h-7"
              >
                {flag.key.split('-')[0]}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};