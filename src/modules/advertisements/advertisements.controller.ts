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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('advertisements')
@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementsService: AdvertisementsService) { }
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAllUserAd(@Request() req: any) {
    return this.advertisementsService.findAllUserAd(req.user.id);
  }

  @Get('/user/:id')
  findAllAvailableUserAd(@Param('id') id: any) {
    return this.advertisementsService.findAllAvailableUserAd(id);
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


