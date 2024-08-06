import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthLoginDTO } from 'src/auth/dto/autho-dto';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import { UserEntity } from './user-entity';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) 
    private userRepo: Repository<UserEntity>,
  ) {}
  
  async create(userDTO: CreateUserDTO): Promise<UserEntity>{
    const user = new UserEntity();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName
    user.email = userDTO.email;
    user.apiKey = uuid4()

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(userDTO.password, salt);
    
    const savedUser = await this.userRepo.save(user);
    delete savedUser.password;
    return savedUser;
  }

  async findOneUser(data: AuthLoginDTO): Promise<UserEntity>{
    const user = await this.userRepo.findOneBy({ email: data.email})

    if(!user){
      throw new UnauthorizedException('Could not find user')
    }
    return user;
  }
}
