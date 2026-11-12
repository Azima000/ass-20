import { Module } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AuthModule } from './module/auth/auth.module.js';
import { UserModule } from './module/user/user.module.js';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './common/service/Redis Service/redis.module.js';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './configuration/env.service.js';
import { BrandModule } from './module/brand/brand.module.js';
import { ProductModule } from './module/product/product.module.js';
import { CategoryModule } from './module/category/category.module.js';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller.js';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
    controllers: [AppController],

    providers: [AppService],

    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.dev', '.env.prod'],
            isGlobal: true,
        }),
        MongooseModule.forRoot(
            env.databaseURL
        ),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            graphiql: true
        }),
        CacheModule.register({
            isGlobal: true,
            ttl: 10000
        }),
        AuthModule,
        UserModule,
        RedisModule,
        BrandModule,
        ProductModule,
        CategoryModule,
    ],
})
export class AppModule { }
