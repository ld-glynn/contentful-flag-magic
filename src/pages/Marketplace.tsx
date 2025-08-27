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
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  Search, 
  Filter,
  Heart,
  Share,
  ArrowRight 
} from 'lucide-react';

export const Marketplace: React.FC = () => {
  const [context] = useState<LDContext>(getStoredContext());
  const [heroContent, setHeroContent] = useState<any>(null);
  const [currentEvaluation, setCurrentEvaluation] = useState<any>(null);

  useEffect(() => {
    const evaluateContent = async () => {
      // Use product-recommendation flag for marketplace demo
      const evaluation = await ldClient.evaluateFlag('product-recommendation', context);
      setCurrentEvaluation(evaluation);
      
      const heroResult = await resolveContentForFlag(
        'product-recommendation',
        evaluation.variation,
        evaluation.variationName
      );
      setHeroContent(heroResult);
    };

    evaluateContent();
  }, [context]);

  const products = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      price: 129.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Smart Watch Series X",
      price: 299.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      badge: "New"
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: 89.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      price: 159.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop"
    }
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery on orders over $50"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your payment information is protected"
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description: "30-day money-back guarantee"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section - Flag Controlled */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-600/10" />
          
          <div className="container mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              {heroContent?.entry ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <VariantBadge
                      flagKey="product-recommendation"
                      variationName={currentEvaluation?.variationName || 'basic'}
                      variationIndex={currentEvaluation?.variation || 0}
                    />
                    <Badge variant="secondary" className="text-xs">
                      Marketplace Demo
                    </Badge>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    {heroContent.entry.fields.title || 'Galaxy Marketplace'}
                  </h1>
                  
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {heroContent.entry.fields.description || 'Discover amazing products from sellers worldwide'}
                  </p>
                  
                  {/* Search Bar */}
                  <div className="max-w-2xl mx-auto">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={currentEvaluation?.variationName === 'ai-powered' 
                          ? "Tell me what you're looking for..." 
                          : "Search products..."}
                        className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                      />
                      <Button variant="hero" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        {currentEvaluation?.variationName === 'ai-powered' ? 'Ask AI' : 'Search'}
                      </Button>
                    </div>
                  </div>
                  
                  {currentEvaluation?.variationName === 'ai-powered' && (
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 max-w-2xl mx-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">AI-Powered Recommendations</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Our AI analyzes your preferences, browsing history, and similar users to suggest perfect products for you.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted rounded w-1/3 mx-auto"></div>
                  <div className="h-12 bg-muted rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {currentEvaluation?.variationName === 'ai-powered' ? 'Recommended for You' : 'Featured Products'}
                </h2>
                <p className="text-muted-foreground">
                  {currentEvaluation?.variationName === 'ai-powered' 
                    ? 'Curated based on your preferences and behavior'
                    : 'Popular items from our marketplace'
                  }
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="card-gradient border-purple-500/20 hover:border-purple-500/40 transition-all group overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 text-xs">
                        {product.badge}
                      </Badge>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">(124 reviews)</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">${product.price}</span>
                      <Button variant="outline" size="sm">
                        Add to Cart
                      </Button>
                    </div>

                    {currentEvaluation?.variationName === 'ai-powered' && (
                      <div className="mt-3 p-2 bg-primary/10 rounded text-xs text-primary">
                        <strong>94% match</strong> - Based on your shopping history
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gradient-subtle">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Shop With Us?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience the best online shopping with our customer-first approach
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="card-gradient border-purple-500/20 text-center">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
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
                  This marketplace demo shows how flags control product recommendation features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Active Flag</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">product-recommendation</Badge>
                      <span className="text-sm text-muted-foreground">→ Search experience & recommendations</span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      <strong>Basic:</strong> Standard product search<br />
                      <strong>AI-Powered:</strong> Personalized recommendations with ML
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Current Variation</h4>
                    <div className="space-y-1 text-sm">
                      <div>Variation: <span className="font-mono">{currentEvaluation?.variationName || 'loading...'}</span></div>
                      <div>User: <span className="font-mono">{context.key}</span></div>
                      <div>Context: <span className="font-mono">{context.custom?.plan}</span></div>
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