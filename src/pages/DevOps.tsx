import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { ResolvedEntry } from '@/components/ResolvedEntry';
import { VariantBadge } from '@/components/VariantBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { getStoredContext, ldClient, type LDContext } from '@/lib/launchDarkly';
import { resolveContentForFlag } from '@/lib/contentful';
import { 
  Cpu, 
  GitBranch, 
  Zap, 
  Shield, 
  BarChart3, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Activity,
  Rocket
} from 'lucide-react';

export const DevOps: React.FC = () => {
  const [context] = useState<LDContext>(getStoredContext());
  const [heroContent, setHeroContent] = useState<any>(null);
  const [currentEvaluation, setCurrentEvaluation] = useState<any>(null);

  useEffect(() => {
    const evaluateContent = async () => {
      // Use onboarding-flow flag but with gamified variation for devops
      const evaluation = await ldClient.evaluateFlag('onboarding-flow', context);
      setCurrentEvaluation(evaluation);
      
      const heroResult = await resolveContentForFlag(
        'onboarding-flow',
        evaluation.variation,
        evaluation.variationName
      );
      setHeroContent(heroResult);
    };

    evaluateContent();
  }, [context]);

  const releases = [
    {
      id: 'v2.4.1',
      status: 'deployed',
      environment: 'production',
      timestamp: '2 hours ago',
      success: true,
      features: 3
    },
    {
      id: 'v2.4.2',
      status: 'staging',
      environment: 'staging',
      timestamp: '30 minutes ago',
      success: true,
      features: 5
    },
    {
      id: 'v2.5.0',
      status: 'building',
      environment: 'development',
      timestamp: 'now',
      success: null,
      features: 8
    }
  ];

  const metrics = [
    {
      label: 'Deployment Success Rate',
      value: '99.8%',
      icon: CheckCircle2,
      color: 'text-green-400'
    },
    {
      label: 'Mean Time to Recovery',
      value: '4.2min',
      icon: Clock,
      color: 'text-blue-400'
    },
    {
      label: 'Active Feature Flags',
      value: '47',
      icon: GitBranch,
      color: 'text-purple-400'
    },
    {
      label: 'System Health',
      value: '98.5%',
      icon: Activity,
      color: 'text-green-400'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Progressive Delivery",
      description: "Roll out features safely with canary deployments and feature flags"
    },
    {
      icon: Shield,
      title: "Automated Rollbacks",
      description: "AI-powered monitoring detects issues and automatically reverts deployments"
    },
    {
      icon: BarChart3,
      title: "Release Intelligence",
      description: "Deep insights into deployment performance and feature adoption"
    },
    {
      icon: Rocket,
      title: "CI/CD Pipeline",
      description: "Streamlined workflows from code commit to production deployment"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-500';
      case 'staging': return 'bg-blue-500';
      case 'building': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed': return CheckCircle2;
      case 'staging': return Clock;
      case 'building': return Activity;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section - Flag Controlled */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-emerald-600/10" />
          
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                {heroContent?.entry ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <VariantBadge
                        flagKey="onboarding-flow"
                        variationName={currentEvaluation?.variationName || 'standard'}
                        variationIndex={currentEvaluation?.variation || 0}
                      />
                      <Badge variant="secondary" className="text-xs">
                        DevOps Demo
                      </Badge>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      {heroContent.entry.fields.title || 'Release Portal'}
                    </h1>
                    
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {heroContent.entry.fields.description || 'Streamline your deployment workflow'}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="hero" size="xl">
                        {heroContent.entry.fields.ctaText || 'View Deployments'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <Button variant="hero-outline" size="xl">
                        Setup Pipeline
                      </Button>
                    </div>

                    {currentEvaluation?.variationName === 'gamified' && (
                      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-primary">AI-Enhanced Intelligence</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Advanced ML algorithms provide predictive deployment analytics and automated optimization recommendations.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-12 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <Card key={index} className="card-gradient border-green-500/20">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`w-4 h-4 ${metric.color}`} />
                            <span className="text-xs text-muted-foreground">{metric.label}</span>
                          </div>
                          <div className="text-xl font-bold">{metric.value}</div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Release Pipeline */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Active Releases</h2>
              <p className="text-muted-foreground">
                Track your deployments across all environments
              </p>
            </div>

            <div className="space-y-4">
              {releases.map((release) => {
                const StatusIcon = getStatusIcon(release.status);
                return (
                  <Card key={release.id} className="card-gradient border-green-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(release.status)}`} />
                          <div>
                            <h3 className="font-semibold text-lg">{release.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              {release.features} features • {release.environment}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <StatusIcon className="w-4 h-4" />
                              <span className="font-medium capitalize">{release.status}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">{release.timestamp}</div>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>

                      {currentEvaluation?.variationName === 'gamified' && release.status === 'deployed' && (
                        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary">AI Performance Analysis</span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-xs">
                            <div>
                              <div className="text-muted-foreground">Error Rate</div>
                              <div className="font-mono text-green-400">0.02%</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Response Time</div>
                              <div className="font-mono text-blue-400">145ms</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">User Adoption</div>
                              <div className="font-mono text-purple-400">87%</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 bg-gradient-subtle">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need for modern software delivery and release management
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="card-gradient border-green-500/20 hover:border-green-500/40 transition-all">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-sm">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Flag Information Footer */}
        <section className="py-12 px-4 border-t border-border/50">
          <div className="container mx-auto">
            <Card className="card-gradient border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Demo Information</CardTitle>
                <CardDescription>
                  This DevOps portal demonstrates advanced release intelligence controlled by feature flags
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Active Flag</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">onboarding-flow</Badge>
                      <span className="text-sm text-muted-foreground">→ Platform intelligence level</span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <strong>Standard:</strong> Basic deployment tracking<br />
                      <strong>Simplified:</strong> Enhanced user experience<br />
                      <strong>Gamified:</strong> AI-powered analytics and insights
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Current Configuration</h4>
                    <div className="space-y-1 text-sm">
                      <div>Mode: <span className="font-mono">{currentEvaluation?.variationName || 'loading...'}</span></div>
                      <div>User: <span className="font-mono">{context.key}</span></div>
                      <div>Role: <span className="font-mono">{context.custom?.plan || 'developer'}</span></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};