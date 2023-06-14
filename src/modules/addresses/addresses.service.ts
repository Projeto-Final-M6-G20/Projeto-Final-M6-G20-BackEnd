import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressesRepository } from './repositories/addresses.repository';

@Injectable()
export class AddressesService {
  constructor(private addressesRepository: AddressesRepository) { }
  async findOne(id: string) {
    const findAddress = await this.addressesRepository.findOne(id)
    if (!findAddress) {
      throw new NotFoundException('Address not found')
    }
    return this.addressesRepository.findOne(id)
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const findAddress = await this.addressesRepository.findOne(id)
    if (!findAddress) {
      throw new NotFoundException('Address not found')
    }
    return this.addressesRepository.update(id, updateAddressDto)
  }

}
