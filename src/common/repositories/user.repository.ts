import { User } from 'src/entity/user.entity';  // Import your TypeORM entity
import { BaseRepository } from 'src/shared/Crud/repository/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '../interfaces/repository/user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor(
        @InjectRepository(User)
        repository: IUserRepository) {
        super(repository);
    }
}