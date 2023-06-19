import { CreateAdvertisementDto } from '../dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from '../dto/update-advertisement.dto';
import { Advertisement } from '../entities/advertisement.entity';

export abstract class AdvertisementsRepository {
  abstract create(
    data: CreateAdvertisementDto,
    userId: string,
  ): Promise<Advertisement> | Advertisement;
  abstract findAll(): Promise<Advertisement[]> | Advertisement[];
  abstract findOne(
    id: string,
  ): Promise<Advertisement | undefined> | Advertisement | undefined;
  abstract update(
    id: string,
    advertisement: UpdateAdvertisementDto,
  ): Promise<Advertisement> | Advertisement;
  abstract delete(id: string): Promise<void> | void;
}
