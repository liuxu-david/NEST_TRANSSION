import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS')
    private readonly client: Redis
  ) {}

  // String 结构的读取
  async get(key: any) {
    return this.client.get(key)
  }

  async set(key:string, value: string, expiration?: number) {
    if (expiration) {
      await this.client.set(key, value, 'EX' ,expiration)
    } else {
      await this.client.set(key, value)
    }
  }

  // Hash 结构的读取
  async getHash(obj: any, key: any) {
    return this.client.hget(obj, key)
  }

  async setHash(key: string, value: Object) {
    await this.client.hset(key, value)
  }

 }
