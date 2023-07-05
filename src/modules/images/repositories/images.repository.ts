import { UpdateImageDto } from "../dto/update-image.dto";
import { Image } from "../entities/image.entity";


export abstract class ImagesRepository {
  abstract findOne(id: string): Promise<Image | undefined> | Image | undefined
  abstract update(id: string, data: UpdateImageDto): Promise<Image> | Image
  abstract delete(id: string): Promise<void> | void
}