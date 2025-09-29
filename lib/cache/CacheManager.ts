export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
}
interface CacheConfig {
  DEFAULT_TTL: number; // in milliseconds
  MAX_CACHE_SIZE: number; // max items per cache type
}
export class CacheManager<T> {
  private cache: Map<string, T>;
  private ttlMap: Map<string, number>;
  private stats: CacheStats;
  private config: CacheConfig = {
    DEFAULT_TTL: 5 * 1000 * 60, // 5 minutes
    MAX_CACHE_SIZE: 100, // per cache type
  };

  constructor() {
    this.cache = new Map();
    this.ttlMap = new Map();
    this.stats = {
      hits: 0,
      misses: 0,
      size: 0,
      hitRate: 0,
    };
  }

  public set(key: string, data: T, customTTL?: number) {
    if (this.cache.size >= this.config.MAX_CACHE_SIZE) {
      const iterator = this.cache.entries();
      const firstEntry = iterator.next().value;
      const firstKey = firstEntry?.[0];
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    const expirationDuration =
      Date.now() + (customTTL || this.config.DEFAULT_TTL);
    this.cache.set(key, data);
    this.ttlMap.set(key, expirationDuration);
  }

  public get(key: string): T | null {
    if (this.cache.has(key)) {
      const ttl = this.ttlMap.get(key);
      if (ttl && Date.now() > ttl) {
        this.cache.delete(key);
        this.ttlMap.delete(key);
        this.stats.misses += 1;
        return null;
      } else {
        this.stats.hits += 1;
        const value = this.cache.get(key);
        return value !== undefined ? value : null;
      }
    } else {
      this.stats.misses += 1;
      return null;
    }
  }

  public delete(key: string) {
    const exists = this.cache.has(key);

    this.cache.delete(key);
    this.ttlMap.delete(key);
  }

  public clear() {
    this.cache.clear();
    this.ttlMap.clear();
    this.stats = {
      misses: 0,
      hits: 0,
      size: 0,
      hitRate: 0,
    };
  }

  public invalidateExpired() {
    for (const [key, value] of this.ttlMap) {
      if (value && Date.now() > value) {
        this.cache.delete(key);
        this.ttlMap.delete(key);
      }
    }
  }

  public getStats() {
    this.stats.hitRate =
      this.stats.hits + this.stats.misses === 0
        ? 0
        : (this.stats.hits / (this.stats.hits + this.stats.misses)) * 100;
    this.stats.size = this.cache.size;
    return this.stats;
  }

  public getSize(): number {
    return this.cache.size;
  }
}
