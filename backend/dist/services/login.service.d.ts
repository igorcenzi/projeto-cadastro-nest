import { LoginDto } from '../users/dto/login-dto';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class LoginService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    login(user: LoginDto): Promise<{
        token: string;
    }>;
}
