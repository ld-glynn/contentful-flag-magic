import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import { cn } from '@/lib/utils';
import { Flag, Home, PlayCircle, BookOpen, Building2, ShoppingCart, Cpu } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/playground', label: 'Playground', icon: PlayCircle },
    { path: '/guide', label: 'Guide', icon: BookOpen },
  ];

  const verticalItems = [
    { path: '/verticals/banking', label: 'Banking', icon: Building2 },
    { path: '/verticals/marketplace', label: 'Marketplace', icon: ShoppingCart },
    { path: '/verticals/devops', label: 'DevOps', icon: Cpu },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Flag className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:inline">LD × Contentful</span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  asChild
                  variant={isActive ? "pill" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2 transition-all",
                    isActive && "shadow-glow-primary"
                  )}
                >
                  <Link to={item.path}>
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}

            {/* Vertical Demos Dropdown */}
            <div className="relative group">
              <Button variant="ghost" size="sm" className="gap-1">
                Demos
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
              
              <div className="absolute top-full left-0 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-card/95 backdrop-blur-lg rounded-lg border border-border/50 shadow-ld p-1 min-w-40">
                  {verticalItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <Button
                        key={item.path}
                        asChild
                        variant={isActive ? "secondary" : "ghost"}
                        size="sm"
                        className="w-full justify-start gap-2"
                      >
                        <Link to={item.path}>
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};