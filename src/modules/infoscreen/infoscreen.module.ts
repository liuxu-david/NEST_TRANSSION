import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import { InfoscreenResolver } from "./infoscreen.resolver";

import { ApolloDriver } from "@nestjs/apollo";
import { join } from "path";
import { ChuanyinService } from "../chuanyin/chuanyin.service";
import { HttpModule } from "@nestjs/axios";


@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/modules/infoscreen/schema.gql'),
      path: 'graphql',
    }),
    HttpModule
  ],
  providers: [InfoscreenResolver, ChuanyinService]
})
export class InfoscreenModule {}
