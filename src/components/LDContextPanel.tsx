import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { getStoredContext, setStoredContext, type LDContext } from '@/lib/launchDarkly';
import { Save, RotateCcw, User, Mail, Globe, Settings } from 'lucide-react';

interface LDContextPanelProps {
  context: LDContext;
  onContextChange: (context: LDContext) => void;
}

export const LDContextPanel: React.FC<LDContextPanelProps> = ({
  context,
  onContextChange
}) => {
  const [localContext, setLocalContext] = useState<LDContext>(context);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLocalContext(context);
  }, [context]);

  const handleSave = () => {
    onContextChange(localContext);
    setStoredContext(localContext);
    setIsEditing(false);
  };

  const handleReset = () => {
    const defaultContext = getStoredContext();
    setLocalContext(defaultContext);
    onContextChange(defaultContext);
    setStoredContext(defaultContext);
    setIsEditing(false);
  };

  const updateCustomAttribute = (key: string, value: any) => {
    setLocalContext(prev => ({
      ...prev,
      custom: {
        ...prev.custom,
        [key]: value
      }
    }));
  };

  const removeCustomAttribute = (key: string) => {
    const { [key]: removed, ...rest } = localContext.custom || {};
    setLocalContext(prev => ({
      ...prev,
      custom: rest
    }));
  };

  return (
    <Card className="card-gradient border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5" />
              LaunchDarkly Context
            </CardTitle>
            <CardDescription>
              Configure user attributes for flag evaluation
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings className="w-4 h-4 mr-1" />
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Basic Attributes */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="userKey" className="text-xs font-medium text-muted-foreground">
                User Key
              </Label>
              <Input
                id="userKey"
                value={localContext.key}
                onChange={(e) => setLocalContext(prev => ({ ...prev, key: e.target.value }))}
                disabled={!isEditing}
                className="font-mono text-sm"
              />
            </div>
            <div>
              <Label htmlFor="userName" className="text-xs font-medium text-muted-foreground">
                Name
              </Label>
              <Input
                id="userName"
                value={localContext.name || ''}
                onChange={(e) => setLocalContext(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                className="text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="email" className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Mail className="w-3 h-3" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={localContext.email || ''}
                onChange={(e) => setLocalContext(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                className="text-sm"
              />
            </div>
            <div>
              <Label htmlFor="country" className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Country
              </Label>
              <Input
                id="country"
                value={localContext.country || ''}
                onChange={(e) => setLocalContext(prev => ({ ...prev, country: e.target.value }))}
                disabled={!isEditing}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        {/* Custom Attributes */}
        <div>
          <Label className="text-xs font-medium text-muted-foreground mb-2 block">
            Custom Attributes
          </Label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {Object.entries(localContext.custom || {}).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                <Badge variant="outline" className="font-mono text-xs flex-shrink-0">
                  {key}
                </Badge>
                <span className="text-sm flex-1 font-mono">
                  {typeof value === 'string' ? `"${value}"` : JSON.stringify(value)}
                </span>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomAttribute(key)}
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                  >
                    ×
                  </Button>
                )}
              </div>
            ))}
            
            {(!localContext.custom || Object.keys(localContext.custom).length === 0) && (
              <div className="text-xs text-muted-foreground text-center py-2">
                No custom attributes
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-2 pt-2">
            <Button variant="hero" size="sm" onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-1" />
              Save Context
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        )}

        {/* Current Status */}
        <div className="pt-3 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            Context will be used for flag evaluation across all demos
          </div>
        </div>
      </CardContent>
    </Card>
  );
};