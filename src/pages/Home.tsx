import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { 
  Flag, 
  PlayCircle, 
  BookOpen, 
  Building2, 
  ShoppingCart, 
  Cpu,
  ArrowRight,
  Zap,
  Globe,
  Shield
} from 'lucide-react';

export const Home: React.FC = () => {
  const features = [
    {
      icon: Flag,
      title: "Content-Flag Association",
      description: "Connect Contentful entries directly to LaunchDarkly flag variations without code changes."
    },
    {
      icon: Zap,
      title: "Instant Preview",
      description: "See content changes in real-time as you switch between flag variations."
    },
    {
      icon: Globe,
      title: "Multi-Environment",
      description: "Test content across different environments and user contexts seamlessly."
    },
    {
      icon: Shield,
      title: "Safe Rollouts",
      description: "Deploy content changes safely with LaunchDarkly's progressive delivery."
    }
  ];

  const verticals = [
    {
      path: '/verticals/banking',
      title: 'ToggleBank',
      description: 'Digital banking with personalized experiences',
      icon: Building2,
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      path: '/verticals/marketplace',
      title: 'Galaxy Marketplace',
      description: 'E-commerce with AI-powered recommendations',
      icon: ShoppingCart,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      path: '/verticals/devops',
      title: 'Release Portal',
      description: 'DevOps platform with intelligent deployments',
      icon: Cpu,
      gradient: 'from-green-600 to-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
          
          <div className="container mx-auto text-center relative">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary-glow to-accent bg-clip-text text-transparent leading-tight">
              Associate Content to Variations
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Seamlessly connect Contentful entries to LaunchDarkly flag variations. 
              No code deploys required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild variant="hero" size="xl">
                <Link to="/playground">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Start the Demo
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/guide">
                  <BookOpen className="w-5 h-5 mr-2" />
                  How it Works
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto text-center">
              <div>
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Sample Flags</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">12+</div>
                <div className="text-sm text-muted-foreground">Content Entries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-glow">3</div>
                <div className="text-sm text-muted-foreground">Industry Demos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">0</div>
                <div className="text-sm text-muted-foreground">Code Required</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Powerful Content Management
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="card-gradient border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow-primary/20">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
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

        {/* Vertical Demos Section */}
        <section className="py-20 px-4 bg-gradient-subtle">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Industry Demo Scenarios
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore how content-flag associations work across different industries and use cases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {verticals.map((vertical, index) => {
                const Icon = vertical.icon;
                return (
                  <Card key={index} className="card-gradient border-primary/20 hover:border-primary/40 transition-all group overflow-hidden">
                    <CardHeader>
                      <div className={`w-12 h-12 bg-gradient-to-r ${vertical.gradient} rounded-full flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{vertical.title}</CardTitle>
                      <CardDescription>{vertical.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Link to={vertical.path}>
                          Explore Demo
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <Card className="card-gradient border-primary/30 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">
                  Ready to See It in Action?
                </CardTitle>
                <CardDescription className="text-lg">
                  Jump into the interactive playground and experience the power of content-flag associations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="gradient" size="xl" className="animate-glow">
                  <Link to="/playground">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Launch Playground
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};