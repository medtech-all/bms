import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';  // Import your TypeORM entity
import { BaseRepository } from 'src/shared/Crud/repository/base.repository';
import { IRepository } from 'src/shared/Crud/repository/base.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '../interfaces/repository/user.repository.interface';

export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor(
        @InjectRepository(User)
        repository: IUserRepository) {
        super(repository);
    }
}