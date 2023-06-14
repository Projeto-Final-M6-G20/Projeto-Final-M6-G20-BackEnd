import { plainToInstance } from 'class-transformer';
import { Injectable } from "@nestjs/common";
import { Address } from "../../entities/address.entity";
import { PrismaService } from "src/database/prisma.service";
import { UpdateAddressDto } from "../../dto/update-address.dto";
import { AddressesRepository } from "../addresses.repository";

@Injectable()
export class AddressesPrismaRepository implements AddressesRepository {
  constructor(private prisma: PrismaService) { }

  async findOne(userId: string): Promise<Address> {
    const userAddress = await this.prisma.address.findUnique({
      where: { userId }
    })
    return plainToInstance(Address, userAddress)
  }
  async update(userId: string, data: UpdateAddressDto): Promise<Address> {
    const updatedAddress = await this.prisma.address.update({
      where: { userId },
      data: { ...data }
    });

    return plainToInstance(Address, updatedAddress)
  }

}