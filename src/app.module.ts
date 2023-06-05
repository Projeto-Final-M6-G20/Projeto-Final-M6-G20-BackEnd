import { Module } from '@nestjs/common';
import { AdvertisementsModule } from './modules/advertisements/advertisements.module';
@Module({
  imports: [AdvertisementsModule],
})
export class AppModule { }
