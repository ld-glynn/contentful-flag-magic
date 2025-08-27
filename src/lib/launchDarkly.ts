// Mock LaunchDarkly client for demo purposes
// In a real app, this would integrate with the actual LaunchDarkly SDKs

import { mockFlags, mockFlagMappings, type LDFlag } from './mockData';

export interface LDContext {
  key: string;
  name?: string;
  email?: string;
  country?: string;
  custom?: Record<string, any>;
}

export interface FlagEvaluation {
  flagKey: string;
  variation: number;
  value: any;
  variationName?: string;
}

// Mock LaunchDarkly client
export class MockLDClient {
  private flags: LDFlag[] = mockFlags;

  async evaluateFlag(flagKey: string, context: LDContext, defaultValue: any = false): Promise<FlagEvaluation> {
    const flag = this.flags.find(f => f.key === flagKey);
    
    if (!flag) {
      return {
        flagKey,
        variation: 0,
        value: defaultValue,
        variationName: 'default'
      };
    }

    // Simple hash-based assignment for consistent results
    const hash = this.hashContext(context, flagKey);
    const variationIndex = hash % flag.variations.length;
    
    return {
      flagKey,
      variation: variationIndex,
      value: flag.variations[variationIndex].value,
      variationName: flag.variations[variationIndex].name
    };
  }

  async evaluateAllFlags(context: LDContext): Promise<Record<string, FlagEvaluation>> {
    const results: Record<string, FlagEvaluation> = {};
    
    for (const flag of this.flags) {
      results[flag.key] = await this.evaluateFlag(flag.key, context);
    }
    
    return results;
  }

  getAllFlags(): LDFlag[] {
    return this.flags;
  }

  getFlagByKey(key: string): LDFlag | undefined {
    return this.flags.find(f => f.key === key);
  }

  // Simple hash function for consistent flag evaluation
  private hashContext(context: LDContext, salt: string): number {
    const str = `${context.key}-${salt}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  // Override flag evaluation for manual testing
  forceVariation(flagKey: string, variation: number): void {
    const flag = this.flags.find(f => f.key === flagKey);
    if (flag && variation < flag.variations.length) {
      // Store forced variations in session storage for demo
      const forcedVariations = JSON.parse(sessionStorage.getItem('forced-variations') || '{}');
      forcedVariations[flagKey] = variation;
      sessionStorage.setItem('forced-variations', JSON.stringify(forcedVariations));
    }
  }

  // Check for forced variations
  private getForcedVariation(flagKey: string): number | null {
    const forcedVariations = JSON.parse(sessionStorage.getItem('forced-variations') || '{}');
    return forcedVariations[flagKey] ?? null;
  }
}

// Singleton instance for demo
export const ldClient = new MockLDClient();

// Context management
export const getStoredContext = (): LDContext => {
  const stored = localStorage.getItem('ld-context');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to default
    }
  }
  
  return {
    key: "demo-user-" + Math.random().toString(36).substr(2, 9),
    name: "Demo User",
    email: "demo@example.com",
    country: "US",
    custom: {
      plan: "enterprise",
      beta_user: true
    }
  };
};

export const setStoredContext = (context: LDContext): void => {
  localStorage.setItem('ld-context', JSON.stringify(context));
};