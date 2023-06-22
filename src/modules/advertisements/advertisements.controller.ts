import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from './dto/pagination.dto';
import { FiltersAdvertisementDto } from './dto/filters-advertisement.dto';

@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) { }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createAdvertisementDto: CreateAdvertisementDto,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return this.advertisementsService.create(createAdvertisementDto, userId);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto, @Query() filters?: FiltersAdvertisementDto) {
    return this.advertisementsService.findAll(paginationDto, filters);
  }



  @Get('/user')
  @UseGuards(AuthGuard('jwt'))
  findAllUserAd(@Request() req: any) {
    return this.advertisementsService.findAllUserAd(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertisementsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdvertisementDto: UpdateAdvertisementDto,
  ) {
    return this.advertisementsService.update(id, updateAdvertisementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertisementsService.remove(id);
  }
}


