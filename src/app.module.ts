import { Module } from '@nestjs/common';
import { AdvertisementsModule } from './modules/advertisements/advertisements.module';
import { UsersModule } from './modules/users/users.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { AuthModule } from './modules/auth/auth.module';
import { ImagesModule } from './modules/images/images.module';
import { CommentsModule } from './modules/comments/comments.module';
@Module({
  imports: [
    AdvertisementsModule,
    UsersModule,
    AddressesModule,
    AuthModule,
    ImagesModule,
    CommentsModule,
  ],
})
export class AppModule {}
