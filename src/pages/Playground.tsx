import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { LDContextPanel } from '@/components/LDContextPanel';
import { FlagSelector } from '@/components/FlagSelector';
import { ResolvedEntry } from '@/components/ResolvedEntry';
import { VariantBadge } from '@/components/VariantBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  getStoredContext, 
  setStoredContext, 
  ldClient, 
  type LDContext,
  type FlagEvaluation 
} from '@/lib/launchDarkly';
import { resolveContentForFlag } from '@/lib/contentful';
import { 
  Play, 
  Eye, 
  EyeOff, 
  Copy, 
  RefreshCw,
  Settings,
  Grid3X3,
  Layers
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResolvedContent {
  entry: any;
  entryId: string | null;
  mapping: any;
  evaluation: FlagEvaluation;
}

export const Playground: React.FC = () => {
  const { toast } = useToast();
  const [context, setContext] = useState<LDContext>(getStoredContext());
  const [selectedFlagKey, setSelectedFlagKey] = useState<string>('hero-banner-variant');
  const [usePreview, setUsePreview] = useState(false);
  const [showMapping, setShowMapping] = useState(true);
  const [resolvedContent, setResolvedContent] = useState<ResolvedContent[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Evaluate flag and resolve content
  const evaluateFlag = async () => {
    if (!selectedFlagKey) return;

    setIsEvaluating(true);
    try {
      const flag = ldClient.getFlagByKey(selectedFlagKey);
      if (!flag) return;

      const results: ResolvedContent[] = [];

      // Evaluate for each variation
      for (let i = 0; i < flag.variations.length; i++) {
        // Force specific variation for comparison
        ldClient.forceVariation(selectedFlagKey, i);
        const evaluation = await ldClient.evaluateFlag(selectedFlagKey, context);
        
        const resolved = await resolveContentForFlag(
          selectedFlagKey,
          i,
          flag.variations[i].name,
          usePreview
        );

        results.push({
          ...resolved,
          evaluation
        });
      }

      setResolvedContent(results);
      
      toast({
        title: "Flag Evaluated",
        description: `Resolved content for ${results.length} variations`,
      });

    } catch (error) {
      console.error('Error evaluating flag:', error);
      toast({
        title: "Evaluation Error",
        description: "Failed to evaluate flag variations",
        variant: "destructive"
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  // Auto-evaluate when dependencies change
  useEffect(() => {
    if (selectedFlagKey) {
      evaluateFlag();
    }
  }, [selectedFlagKey, context, usePreview]);

  const handleContextChange = (newContext: LDContext) => {
    setContext(newContext);
    setStoredContext(newContext);
  };

  const copyApiCall = () => {
    const apiCall = `curl -X POST '/api/resolve' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "flagKey": "${selectedFlagKey}",
    "context": ${JSON.stringify(context, null, 2)}
  }'`;
    
    navigator.clipboard.writeText(apiCall);
    toast({
      title: "Copied to Clipboard",
      description: "API call example copied",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <div className="container mx-auto p-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Flag ↔ Content Playground
            </h1>
            <p className="text-lg text-muted-foreground">
              Experiment with LaunchDarkly flags and see how content changes across variations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Flag Selection */}
              <FlagSelector
                selectedFlagKey={selectedFlagKey}
                onFlagSelect={setSelectedFlagKey}
              />

              {/* Context Configuration */}
              <LDContextPanel
                context={context}
                onContextChange={handleContextChange}
              />

              {/* Settings */}
              <Card className="card-gradient border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Evaluation Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="preview-mode" className="flex items-center gap-2 text-sm">
                      {usePreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      Preview Mode
                    </Label>
                    <Switch
                      id="preview-mode"
                      checked={usePreview}
                      onCheckedChange={setUsePreview}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-mapping" className="flex items-center gap-2 text-sm">
                      <Layers className="w-4 h-4" />
                      Show Mappings
                    </Label>
                    <Switch
                      id="show-mapping"
                      checked={showMapping}
                      onCheckedChange={setShowMapping}
                    />
                  </div>

                  <Button 
                    variant="hero" 
                    size="sm" 
                    onClick={evaluateFlag}
                    disabled={isEvaluating || !selectedFlagKey}
                    className="w-full"
                  >
                    {isEvaluating ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    Evaluate Flag
                  </Button>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyApiCall}
                    className="w-full"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy cURL
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area - Variation Previews */}
            <div className="lg:col-span-3">
              <Card className="card-gradient border-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Grid3X3 className="w-5 h-5" />
                        Variation Comparison
                      </CardTitle>
                      <CardDescription>
                        Side-by-side preview of content for each flag variation
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {usePreview && (
                        <Badge variant="secondary" className="text-xs">
                          PREVIEW MODE
                        </Badge>
                      )}
                      <Badge variant="outline" className="font-mono text-xs">
                        {selectedFlagKey || 'No flag selected'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {!selectedFlagKey ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Grid3X3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2">Select a Feature Flag</h3>
                      <p className="text-sm">Choose a flag from the sidebar to see content variations</p>
                    </div>
                  ) : resolvedContent.length === 0 ? (
                    <div className="text-center py-12">
                      <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
                      <div className="text-sm text-muted-foreground">Evaluating flag variations...</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {resolvedContent.map((content, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm">
                              Variation {content.evaluation.variation}
                            </h3>
                            <VariantBadge
                              flagKey={content.evaluation.flagKey}
                              variationName={content.evaluation.variationName || 'unknown'}
                              variationIndex={content.evaluation.variation}
                            />
                          </div>
                          <ResolvedEntry
                            entry={content.entry}
                            entryId={content.entryId}
                            flagKey={content.evaluation.flagKey}
                            variationName={content.evaluation.variationName || 'unknown'}
                            variationIndex={content.evaluation.variation}
                            isPreview={usePreview}
                            showMapping={showMapping}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* API Information */}
              {selectedFlagKey && (
                <Card className="card-gradient border-accent/20 mt-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Integration Example</CardTitle>
                    <CardDescription>
                      How this would work in your application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                      <div className="text-accent mb-2">// Client-side evaluation</div>
                      <div className="text-muted-foreground">
                        const variation = await ldClient.variation('{selectedFlagKey}', context, false);
                      </div>
                      <div className="text-muted-foreground">
                        const content = await contentful.getEntry(mapping[variation]);
                      </div>
                    </div>
                    
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline">LaunchDarkly SDK</Badge>
                      <Badge variant="outline">Contentful CDA</Badge>
                      <Badge variant="outline">Real-time Updates</Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};