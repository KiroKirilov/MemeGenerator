import { CacheItem } from "../../models/cache/cache-item";

export class CacheHelpers {
    public static async getFromCacheOrSet<T>(key: string, expiresInSeconds: number, dataFunc: () => T | Promise<T>, forceUpdate: boolean = false): Promise<T> {
        const currrentCacheValue: string | null = sessionStorage.getItem(key);
        if (!currrentCacheValue || forceUpdate) {
            return await CacheHelpers.setCacheItem(key, expiresInSeconds, dataFunc);
        }

        const cacheItem: CacheItem<T> = JSON.parse(currrentCacheValue);
        const now: Date = new Date();

        if (cacheItem.expirationDate < now) {
            return await CacheHelpers.setCacheItem(key, expiresInSeconds, dataFunc);
        }

        return cacheItem.data;
    }

    private static async setCacheItem<T>(key: string, expiresInSeconds: number, dataFunc: () => T | Promise<T>): Promise<T> {
        const expirationDate: Date = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + expiresInSeconds);
        const data: T = await dataFunc();
        const cacheItem: CacheItem<T> = {
            expirationDate: expirationDate,
            data: data
        };

        sessionStorage.setItem(key, JSON.stringify(cacheItem));
        return data;
    }
}