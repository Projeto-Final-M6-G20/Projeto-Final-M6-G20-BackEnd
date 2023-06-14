import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@ValidatorConstraint({ async: true })
export class IsCPFUniqueConstraint implements ValidatorConstraintInterface {
  async validate(cpf: string) {
    if (cpf) {
      const user = await prisma.user.findUnique({
        where: { cpf },
      });
      return !user;
    }
  }
}

export function IsCPFUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFUniqueConstraint,
    });
  };
}
