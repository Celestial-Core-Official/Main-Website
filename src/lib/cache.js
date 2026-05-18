/**
 * localStorage caching utilities with 1-hour expiry
 */

const CACHE_EXPIRY_MS = 60 * 60 * 1000; // 1 hour in milliseconds
const CACHE_PREFIX = 'cc_cache_';

/**
 * Get cached data from localStorage
 * @param {string} key - Cache key (without prefix)
 * @returns {any|null} Cached data if valid, null if missing or expired
 */
export function getCachedData(key) {
  try {
    const prefixedKey = `${CACHE_PREFIX}${key}`;
    const cached = localStorage.getItem(prefixedKey);

    if (!cached) {
      return null;
    }

    const { data, timestamp } = JSON.parse(cached);

    // Check if cache has expired
    if (Date.now() - timestamp > CACHE_EXPIRY_MS) {
      clearCache(key);
      return null;
    }

    return data;
  } catch (error) {
    console.warn(`Error retrieving cached data for key "${key}":`, error);
    clearCache(key);
    return null;
  }
}

/**
 * Set data in cache with current timestamp
 * @param {string} key - Cache key (without prefix)
 * @param {any} data - Data to cache
 */
export function setCachedData(key, data) {
  try {
    const prefixedKey = `${CACHE_PREFIX}${key}`;
    const cacheEntry = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(prefixedKey, JSON.stringify(cacheEntry));
  } catch (error) {
    console.warn(`Error setting cached data for key "${key}":`, error);
  }
}

/**
 * Clear a specific cache entry
 * @param {string} key - Cache key (without prefix)
 */
export function clearCache(key) {
  try {
    const prefixedKey = `${CACHE_PREFIX}${key}`;
    localStorage.removeItem(prefixedKey);
  } catch (error) {
    console.warn(`Error clearing cache for key "${key}":`, error);
  }
}

/**
 * Clear all cache entries (all cc_cache_* entries)
 */
export function clearAllCache() {
  try {
    const keysToRemove = [];

    // Collect all cache keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(CACHE_PREFIX)) {
        keysToRemove.push(key);
      }
    }

    // Remove all collected keys
    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.warn('Error clearing all cache:', error);
  }
}
