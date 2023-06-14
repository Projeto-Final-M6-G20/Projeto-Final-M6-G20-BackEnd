import { Address } from 'src/modules/addresses/entities/address.entity';
import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { PrismaService } from "src/database/prisma.service";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { User } from "../../entities/user.entity";
import { UsersRepository } from "../users.repository";

@Injectable()
export class UsersPrismaRepository implements UsersRepository {

  constructor(private prisma: PrismaService) { }
  async create(data: CreateUserDto): Promise<User> {
    const { email, password, fullname, cpf, cellphone, is_advertiser, birth_date, description, street, zip_code, number, city, state, complement } = data
    const userData = {
      email: email,
      password: password,
      fullname: fullname,
      cpf: cpf,
      cellphone: cellphone,
      is_advertiser: is_advertiser,
      birth_date: birth_date,
      description: description
    };
    const addressData = {
      street: street,
      zip_code: zip_code,
      number: number,
      city: city,
      state: state,
      complement: complement
    }

    const user = new User();
    Object.assign(user, userData);

    const address = new Address()
    Object.assign(address, addressData)

    const newUser = await this.prisma.user.create({
      data: {
        ...user,
        birth_date: data.birth_date ? new Date(data.birth_date) : null,
        Address: {
          create: {
            ...address
          }
        }
      }
    }
    );
    const findUser = await this.prisma.user.findFirst({
      where: { id: newUser.id }, include: {
        Address: true
      }

    })

    return plainToInstance(User, findUser);

  }
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()
    return plainToInstance(User, users)
  }
  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id }, include: {
        Address: true
      }
    })
    return plainToInstance(User, user)
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email }

    })
    return user
  }
  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...data }
    })
    return plainToInstance(User, user)
  }
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    })
  }
}
