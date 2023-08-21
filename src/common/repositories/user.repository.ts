import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';  // Import your TypeORM entity

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    // Add custom query methods if needed
}