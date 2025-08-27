import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Download, 
  Settings, 
  Link as LinkIcon, 
  Eye, 
  PlayCircle,
  ArrowRight,
  CheckCircle2,
  Copy,
  ExternalLink
} from 'lucide-react';

export const Guide: React.FC = () => {
  const steps = [
    {
      title: "Install the Contentful App",
      description: "Add the LaunchDarkly content association app to your Contentful space",
      icon: Download,
      code: "# Install from Contentful App Framework\nnpm install @launchdarkly/contentful-app",
      tasks: [
        "Navigate to your Contentful space",
        "Go to Apps > Browse apps",
        "Install the LaunchDarkly app",
        "Configure your LD project credentials"
      ]
    },
    {
      title: "Create or Select a Flag",
      description: "Choose an existing feature flag or create a new one in LaunchDarkly",
      icon: Settings,
      code: `// Example flag configuration
{
  "key": "hero-banner-variant",
  "variations": [
    { "name": "control", "value": false },
    { "name": "treatment", "value": true }
  ],
  "defaultVariation": 0
}`,
      tasks: [
        "Open LaunchDarkly dashboard",
        "Select your project and environment",
        "Create or choose a feature flag",
        "Note the flag key for mapping"
      ]
    },
    {
      title: "Map Content to Variations",
      description: "Associate Contentful entries with specific flag variations",
      icon: LinkIcon,
      code: `// Content mapping structure
{
  "flagKey": "hero-banner-variant",
  "contentMapping": {
    "0": "hero-control-entry-id",
    "1": "hero-treatment-entry-id"
  }
}`,
      tasks: [
        "Open the LD app in Contentful",
        "Select your flag from dropdown",
        "Choose content entries for each variation",
        "Save the mapping configuration"
      ]
    },
    {
      title: "Preview and Test",
      description: "Use this playground to test your flag and content associations",
      icon: Eye,
      code: `// Resolve content in your application
const evaluation = await ldClient.variation(
  'hero-banner-variant', 
  userContext, 
  false
);
const content = await contentful.getEntry(
  mapping[evaluation]
);`,
      tasks: [
        "Return to this playground",
        "Select your configured flag",
        "Test different user contexts",
        "Verify content changes correctly"
      ]
    }
  ];

  const codeExamples = [
    {
      title: "React Hook Example",
      language: "tsx",
      code: `import { useLDClient } from 'launchdarkly-react-client-sdk';
import { useContentfulEntry } from './contentful-hook';

export function HeroBanner() {
  const ldClient = useLDClient();
  const variation = ldClient?.variation('hero-banner-variant', false);
  const { entry } = useContentfulEntry(flagMapping[variation]);

  return (
    <section>
      <h1>{entry?.fields.title}</h1>
      <p>{entry?.fields.description}</p>
      <button>{entry?.fields.ctaText}</button>
    </section>
  );
}`
    },
    {
      title: "Server-Side Rendering",
      language: "typescript",
      code: `import { init as initLD } from 'launchdarkly-node-server-sdk';
import { createClient as createContentful } from 'contentful';

export async function getServerSideProps(context) {
  const ldClient = initLD(process.env.LD_SDK_KEY);
  const contentful = createContentful({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  });

  const user = getUserFromRequest(context.req);
  const variation = await ldClient.variation(
    'hero-banner-variant', 
    user, 
    false
  );
  
  const entryId = flagMapping[variation];
  const entry = await contentful.getEntry(entryId);

  return { props: { entry } };
}`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <div className="container mx-auto p-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Implementation Guide
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how to set up content-to-flag associations in your own application
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="card-gradient border-primary/20">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="font-mono">
                            Step {index + 1}
                          </Badge>
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">
                          {step.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Tasks */}
                      <div>
                        <h4 className="font-medium mb-3">Tasks</h4>
                        <div className="space-y-2">
                          {step.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Code Example */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Example</h4>
                          <Button variant="ghost" size="sm">
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3 font-mono text-sm overflow-x-auto">
                          <pre className="text-muted-foreground whitespace-pre-wrap">
                            {step.code}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Code Examples */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Integration Examples</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {codeExamples.map((example, index) => (
                <Card key={index} className="card-gradient border-accent/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <Badge variant="outline" className="font-mono text-xs">
                        {example.language}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <pre className="text-muted-foreground whitespace-pre-wrap">
                        {example.code}
                      </pre>
                    </div>
                    <Button variant="ghost" size="sm" className="mt-3 w-full">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Resources */}
          <Card className="card-gradient border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Additional Resources
              </CardTitle>
              <CardDescription>
                Documentation and tools to help with your implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start" asChild>
                  <a href="https://docs.launchdarkly.com" target="_blank" rel="noopener noreferrer">
                    <div>
                      <div className="font-medium mb-1">LaunchDarkly Docs</div>
                      <div className="text-xs text-muted-foreground">Official SDK documentation</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                </Button>

                <Button variant="outline" className="h-auto p-4 justify-start" asChild>
                  <a href="https://www.contentful.com/developers/docs/" target="_blank" rel="noopener noreferrer">
                    <div>
                      <div className="font-medium mb-1">Contentful API</div>
                      <div className="text-xs text-muted-foreground">Content Delivery API guide</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                </Button>

                <Button variant="outline" className="h-auto p-4 justify-start" asChild>
                  <Link to="/playground">
                    <div>
                      <div className="font-medium mb-1">Try Playground</div>
                      <div className="text-xs text-muted-foreground">Test flag associations</div>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="card-gradient border-primary/30 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
                <CardDescription className="text-lg">
                  Head to the playground to experiment with flag and content associations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="hero" size="xl">
                  <Link to="/playground">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Launch Playground
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};