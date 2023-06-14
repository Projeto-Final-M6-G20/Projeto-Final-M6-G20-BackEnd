import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address/user/:id/')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) { }
  @UseInterceptors(ClassSerializerInterceptor)

  @Get('')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(id);
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(id, updateAddressDto);
  }

}
