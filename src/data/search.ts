import { batches } from './batches';
import { tasks } from './tasks';
import { locations } from './locations';

export type EntityType = 'species' | 'batch' | 'task' | 'location' | 'person';

export interface SearchIndexItem {
  id: string;
  type: EntityType;
  title: string;
  aliases: string[];
  description: string;
  tags: string[];
  site?: string;
  bay?: string;
  status?: string;
  stage?: string;
  metadata: Record<string, any>;
  dates?: {
    sowDate?: string;
    dueWeek?: string;
    created?: string;
    updated?: string;
  };
  assignee?: string;
  role?: string;
  popularity?: number;
}

// Extract unique species from batches
function indexSpecies(): SearchIndexItem[] {
  const speciesMap = new Map<string, SearchIndexItem>();
  
  batches.forEach(batch => {
    if (!speciesMap.has(batch.species)) {
      speciesMap.set(batch.species, {
        id: batch.species.toLowerCase().replace(/\s+/g, '-'),
        type: 'species',
        title: batch.species,
        aliases: [],
        description: `Plant species: ${batch.species}`,
        tags: ['plant', 'species'],
        metadata: {
          batchCount: 1,
        },
        popularity: 1,
      });
    } else {
      const existing = speciesMap.get(batch.species)!;
      existing.metadata.batchCount += 1;
      existing.popularity = (existing.popularity || 0) + 1;
    }
  });
  
  return Array.from(speciesMap.values());
}

// Index batches
function indexBatches(): SearchIndexItem[] {
  return batches.map(batch => ({
    id: batch.id,
    type: 'batch' as EntityType,
    title: `${batch.species} - ${batch.id}`,
    aliases: [batch.id, batch.species],
    description: `${batch.quantity} plants in ${batch.location}`,
    tags: [batch.stage, batch.health].filter(Boolean),
    site: batch.location,
    status: batch.health,
    stage: batch.stage,
    metadata: {
      quantity: batch.quantity,
      location: batch.location,
      health: batch.health,
    },
    dates: {
      created: batch.started,
    },
    popularity: batch.quantity / 100,
  }));
}

// Index tasks
function indexTasks(): SearchIndexItem[] {
  return tasks.map(task => {
    const isOverdue = task.status === 'overdue';
    const isDueToday = task.status === 'today';
    
    return {
      id: task.id,
      type: 'task' as EntityType,
      title: task.title || `${task.action} - ${task.species}`,
      aliases: [task.action, task.species],
      description: `${task.action} for ${task.species} in ${task.location}`,
      tags: [task.status, task.priority || '', task.type || ''].filter(Boolean),
      site: task.location,
      status: task.status,
      assignee: task.assignee,
      metadata: {
        action: task.action,
        species: task.species,
        estimatedHours: task.estimatedHours,
        priority: task.priority,
      },
      dates: {
        dueWeek: task.due,
      },
      popularity: (isOverdue ? 3 : isDueToday ? 2 : 1),
    };
  });
}

// Index locations
function indexLocations(): SearchIndexItem[] {
  return locations.map(location => ({
    id: location.id,
    type: 'location' as EntityType,
    title: location.name,
    aliases: [location.name, location.type],
    description: `${location.type} - ${location.batches} batches (${location.percentage}% capacity)`,
    tags: [location.type],
    site: location.name,
    metadata: {
      batches: location.batches,
      capacity: location.capacity,
      percentage: location.percentage,
      plants: location.plants,
      temperature: location.temperature,
      type: location.type,
    },
    popularity: location.batches / 10,
  }));
}

// Build full search index
export function buildSearchIndex(): SearchIndexItem[] {
  return [
    ...indexSpecies(),
    ...indexBatches(),
    ...indexTasks(),
    ...indexLocations(),
  ];
}

// Simple fuzzy match scoring
function fuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  
  // Exact match
  if (t === q) return 6;
  
  // Starts with
  if (t.startsWith(q)) return 5;
  
  // Contains word
  if (t.includes(` ${q}`) || t.includes(`-${q}`)) return 4;
  
  // Contains anywhere
  if (t.includes(q)) return 3;
  
  // Fuzzy match (simple character sequence)
  let score = 0;
  let lastIndex = -1;
  for (const char of q) {
    const index = t.indexOf(char, lastIndex + 1);
    if (index > lastIndex) {
      score += 0.5;
      lastIndex = index;
    }
  }
  
  return score > q.length * 0.3 ? 2 : 0;
}

// Calculate relevance score
function calculateScore(item: SearchIndexItem, query: string): number {
  let score = 0;
  
  // Title match
  score += fuzzyScore(query, item.title) * 2;
  
  // ID match
  score += fuzzyScore(query, item.id);
  
  // Aliases
  item.aliases.forEach(alias => {
    score += fuzzyScore(query, alias);
  });
  
  // Tags
  item.tags.forEach(tag => {
    score += fuzzyScore(query, tag) * 0.5;
  });
  
  // Boost by entity type (tasks and batches higher for managers)
  if (item.type === 'task' && item.status === 'overdue') score += 2;
  if (item.type === 'task' && item.status === 'today') score += 1;
  if (item.type === 'batch' && item.stage === 'Active') score += 1;
  
  // Boost by popularity
  score += (item.popularity || 0) * 0.5;
  
  // Freshness boost (recent items)
  if (item.dates?.created) {
    const created = new Date(item.dates.created);
    const daysSince = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince < 14) score += 0.5;
  }
  
  return score;
}

export interface SearchFilters {
  types?: EntityType[];
  status?: string[];
  sites?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}

// Search index with ranking
export function searchIndex(
  index: SearchIndexItem[],
  query: string,
  filters?: SearchFilters
): SearchIndexItem[] {
  if (!query.trim() && !filters) return [];
  
  let results = index;
  
  // Apply filters
  if (filters) {
    if (filters.types && filters.types.length > 0) {
      results = results.filter(item => filters.types!.includes(item.type));
    }
    
    if (filters.status && filters.status.length > 0) {
      results = results.filter(item => 
        item.status && filters.status!.includes(item.status)
      );
    }
    
    if (filters.sites && filters.sites.length > 0) {
      results = results.filter(item => 
        item.site && filters.sites!.some(site => 
          item.site?.toLowerCase().includes(site.toLowerCase())
        )
      );
    }
  }
  
  // Search and rank
  if (query.trim()) {
    const scored = results
      .map(item => ({
        item,
        score: calculateScore(item, query),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);
    
    return scored.map(({ item }) => item);
  }
  
  return results;
}

// Get quick suggestions for dropdown
export function getSuggestions(
  index: SearchIndexItem[],
  query: string,
  limit: number = 5
): Map<EntityType, SearchIndexItem[]> {
  const results = searchIndex(index, query);
  const grouped = new Map<EntityType, SearchIndexItem[]>();
  
  // Group by type
  results.forEach(item => {
    if (!grouped.has(item.type)) {
      grouped.set(item.type, []);
    }
    
    const group = grouped.get(item.type)!;
    if (group.length < limit) {
      group.push(item);
    }
  });
  
  return grouped;
}

// Get recent searches from localStorage
export function getRecentSearches(): string[] {
  try {
    const recent = localStorage.getItem('flourish_recent_searches');
    return recent ? JSON.parse(recent) : [];
  } catch {
    return [];
  }
}

// Save search to recent
export function saveRecentSearch(query: string) {
  try {
    const recent = getRecentSearches();
    const updated = [query, ...recent.filter(q => q !== query)].slice(0, 10);
    localStorage.setItem('flourish_recent_searches', JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }
}
