// Mock Contentful client for demo purposes
// In a real app, this would integrate with the Contentful CDA/CPA

import { mockEntries, mockFlagMappings, type ContentfulEntry, type FlagMapping } from './mockData';

export interface ContentfulConfig {
  usePreview: boolean;
}

export class MockContentfulClient {
  private entries: ContentfulEntry[] = mockEntries;
  private flagMappings: FlagMapping[] = mockFlagMappings;

  async getEntry(id: string, config: ContentfulConfig = { usePreview: false }): Promise<ContentfulEntry | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const entry = this.entries.find(e => e.sys.id === id);
    
    if (!entry) {
      return null;
    }

    // In preview mode, add a preview indicator
    if (config.usePreview) {
      return {
        ...entry,
        fields: {
          ...entry.fields,
          title: entry.fields.title ? `[PREVIEW] ${entry.fields.title}` : entry.fields.title
        }
      };
    }

    return entry;
  }

  async getEntries(contentType?: string, config: ContentfulConfig = { usePreview: false }): Promise<ContentfulEntry[]> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    let results = [...this.entries];
    
    if (config.usePreview) {
      results = results.map(entry => ({
        ...entry,
        fields: {
          ...entry.fields,
          title: entry.fields.title ? `[PREVIEW] ${entry.fields.title}` : entry.fields.title
        }
      }));
    }

    return results;
  }

  async getFlagMapping(flagKey: string): Promise<FlagMapping | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    
    return this.flagMappings.find(m => m.flagKey === flagKey) || null;
  }

  async getAllFlagMappings(): Promise<FlagMapping[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.flagMappings];
  }

  // Utility method to resolve content for a specific flag and variation
  async resolveContentForVariation(
    flagKey: string, 
    variationIndex: number, 
    variationName?: string,
    config: ContentfulConfig = { usePreview: false }
  ): Promise<{
    entry: ContentfulEntry | null;
    entryId: string | null;
    mapping: FlagMapping | null;
  }> {
    const mapping = await this.getFlagMapping(flagKey);
    
    if (!mapping) {
      return { entry: null, entryId: null, mapping: null };
    }

    // Try to get entry ID by variation index first, then by name
    let entryId = mapping.contentMapping[variationIndex.toString()];
    if (!entryId && variationName) {
      entryId = mapping.contentMapping[variationName];
    }

    if (!entryId) {
      return { entry: null, entryId: null, mapping };
    }

    const entry = await this.getEntry(entryId, config);
    return { entry, entryId, mapping };
  }
}

// Singleton instance for demo
export const contentfulClient = new MockContentfulClient();

// Helper function to resolve content for a flag evaluation
export const resolveContentForFlag = async (
  flagKey: string,
  variation: number,
  variationName?: string,
  usePreview: boolean = false
) => {
  return contentfulClient.resolveContentForVariation(
    flagKey,
    variation,
    variationName,
    { usePreview }
  );
};