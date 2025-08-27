import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/enhanced-button';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              404
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Oops! This page doesn't exist
            </p>
            <p className="text-muted-foreground mb-8">
              The page you're looking for might have been moved or doesn't exist.
            </p>
            <Button asChild variant="hero" size="lg">
              <Link to="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
