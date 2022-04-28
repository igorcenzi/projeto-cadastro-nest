import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class RecoveryPasswordService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    resetPassword(cpf: string): Promise<{
        "new password": any;
    }>;
}
