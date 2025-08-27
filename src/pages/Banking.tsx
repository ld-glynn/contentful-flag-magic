import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { ResolvedEntry } from '@/components/ResolvedEntry';
import { VariantBadge } from '@/components/VariantBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { getStoredContext, ldClient, type LDContext } from '@/lib/launchDarkly';
import { resolveContentForFlag } from '@/lib/contentful';
import { Building2, CreditCard, Shield, TrendingUp, Users, ArrowRight } from 'lucide-react';

export const Banking: React.FC = () => {
  const [context] = useState<LDContext>(getStoredContext());
  const [heroContent, setHeroContent] = useState<any>(null);
  const [promoContent, setPromoContent] = useState<any>(null);
  const [currentEvaluation, setCurrentEvaluation] = useState<any>(null);

  useEffect(() => {
    const evaluateContent = async () => {
      // Use onboarding-flow flag for banking demo
      const evaluation = await ldClient.evaluateFlag('onboarding-flow', context);
      setCurrentEvaluation(evaluation);
      
      // Resolve hero content based on flag
      const heroResult = await resolveContentForFlag(
        'onboarding-flow',
        evaluation.variation,
        evaluation.variationName
      );
      setHeroContent(heroResult);

      // Use promo-campaign for secondary content
      const promoEvaluation = await ldClient.evaluateFlag('promo-campaign', context);
      const promoResult = await resolveContentForFlag(
        'promo-campaign',
        promoEvaluation.variation,
        promoEvaluation.variationName
      );
      setPromoContent(promoResult);
    };

    evaluateContent();
  }, [context]);

  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Military-grade encryption and multi-factor authentication"
    },
    {
      icon: CreditCard,
      title: "Smart Cards",
      description: "Contactless payments with real-time fraud detection"
    },
    {
      icon: TrendingUp,
      title: "Investment Tools",
      description: "AI-powered portfolio management and market insights"
    },
    {
      icon: Users,
      title: "Personal Banking",
      description: "Dedicated relationship managers and priority support"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section - Flag Controlled */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-600/10" />
          
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                {heroContent?.entry ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <VariantBadge
                        flagKey="onboarding-flow"
                        variationName={currentEvaluation?.variationName || 'default'}
                        variationIndex={currentEvaluation?.variation || 0}
                      />
                      <Badge variant="secondary" className="text-xs">
                        Banking Demo
                      </Badge>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      {heroContent.entry.fields.title || 'Welcome to ToggleBank'}
                    </h1>
                    
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {heroContent.entry.fields.description || 'Your trusted partner in digital banking solutions'}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button variant="hero" size="xl">
                        {heroContent.entry.fields.ctaText || 'Open Account'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      <Button variant="hero-outline" size="xl">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-12 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Card className="card-gradient border-blue-500/20 shadow-glow-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle>ToggleBank</CardTitle>
                        <CardDescription>Digital Banking Platform</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Available Balance</span>
                        <span className="font-mono font-semibold">$12,450.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Savings Account</span>
                        <span className="font-mono font-semibold">$8,750.00</span>
                      </div>
                      <div className="pt-2 border-t border-border/50">
                        <div className="text-xs text-muted-foreground">Recent Activity</div>
                        <div className="text-sm mt-1">Coffee Shop - $4.50</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose ToggleBank?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the future of banking with our comprehensive digital platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="card-gradient border-blue-500/20 hover:border-blue-500/40 transition-all">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
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

        {/* Promo Section - Also Flag Controlled */}
        <section className="py-20 px-4 bg-gradient-subtle">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              {promoContent?.entry && (
                <ResolvedEntry
                  entry={promoContent.entry}
                  entryId={promoContent.entryId}
                  flagKey="promo-campaign"
                  variationName="default"
                  variationIndex={0}
                  showMapping={true}
                />
              )}
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
                  This page demonstrates how LaunchDarkly flags control content in a banking application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Active Flags</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">onboarding-flow</Badge>
                        <span className="text-sm text-muted-foreground">→ Hero content</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">promo-campaign</Badge>
                        <span className="text-sm text-muted-foreground">→ Promotional content</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">User Context</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>Key: {context.key}</div>
                      <div>Email: {context.email}</div>
                      <div>Plan: {context.custom?.plan}</div>
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