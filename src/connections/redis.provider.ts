import config from '$config';
import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis'

@Injectable()
export class RedisService {
    private logger: Logger = new Logger(RedisService.name)
    private readonly redis: Redis.Redis

    constructor() {
        this.redis = new Redis({
            host: config.ENV.REDIS_HOST,
            port: config.ENV.REDIS_PORT,
            password: config.ENV.REDIS_PASS
        })
    }

    async keys(pattern: string) {
        try {
            return await this.redis.keys(pattern)
        }
        catch (e) { this.logger.error(`ERROR GET KEYS ${pattern}: ${e.message}`) }

        return null
    }

    async set(key: string, value: any, expiry: number = 3600) {
        try {
            await this.redis.set(key, JSON.stringify(value), 'EX', expiry)
        }
        catch (e) { this.logger.error(`ERROR SET KEY ${key}: ${e.message}`) }
    }

    async get<T>(key: string) {
        try {
            const value = await this.redis.get(key)
            return JSON.parse(value) as T
        }
        catch (e) { this.logger.error(`ERROR GET KEY ${key}: ${e.message}`) }
        return null
    }

    async del(key: string) {
        try {
            await this.redis.del(key)
        }
        catch (e) { this.logger.error(`ERROR DEL KEY ${key}: ${e.message}`) }
    }

    getInstance() {
        return this.redis
    }
}
