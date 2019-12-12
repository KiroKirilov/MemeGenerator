export type CacheItem<T> = {
    expirationDate: Date,
    data: T
};