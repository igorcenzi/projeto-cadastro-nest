import { LoginService } from '../services/login.service';
import { LoginDto } from '../users/dto/login-dto';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(user: LoginDto): Promise<{
        token: string;
    }>;
}
