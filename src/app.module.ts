import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './auths/auths.module';
import { ConfigModule } from './config/config.module';
import { FilesModule } from './files/files.module';
import { GamesModule } from './games/games.module';
import { GamingConsolesModule } from './gamingConsoles/gamingConsoles.module';
import { GamingPlacesModule } from './gamingPlaces/gamingPlaces.module';
import { LoggerModule } from './logger/logger.module';
import { PartiesModule } from './parties/parties.module';
import { OrdersModule } from './shop/orders/orders.module';
import { ProductsModule } from './shop/products/products.module';
import { UsersModule } from './users/users.module';
import { NicknamesModule } from './nicknames/nicknames.module';
import { SkinsModule } from './skins/skins.module';
import { UserWalletsModule } from './userWallets/userWallets.module';
import { RequestQueryMapper } from './app.middlewares';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    ),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_SMTP_HOST,
        port: process.env.MAIL_SMTP_PORT,
        secure: true,
        auth: {
          user: process.env.MAIL_SMTP_USER,
          pass: process.env.MAIL_SMTP_PASS,
        },
      },
      defaults: {
        from: 'contact@lanslot.app',
      },
    }),
    AuthsModule,
    ConfigModule,
    FilesModule,
    GamesModule,
    GamingPlacesModule,
    GamingConsolesModule,
    LoggerModule,
    NicknamesModule,
    PartiesModule,
    UsersModule,
    SkinsModule,
    UserWalletsModule,
    ProductsModule,
    OrdersModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV !== 'production') {
      MorganMiddleware.configure('dev'),
        consumer
          .apply(MorganMiddleware)
          .forRoutes('/');
    }
    consumer
      .apply(RequestQueryMapper)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
