import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService, private jwtService: JwtService) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)
    if (user) {
      const passwordMatch = await compare(password, user.password)
      if (passwordMatch) {
        return {
          email: user.email,
          id: user.id
        }
      }
    }
    return null
  }

  async login(email: string) {
    const user = await this.userService.findByEmail(email)
    return {
      token: this.jwtService.sign({ email }, { subject: user.id })
    }
  }


}
