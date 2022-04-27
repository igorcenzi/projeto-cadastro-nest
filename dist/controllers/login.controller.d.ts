import { LoginService } from 'src/services/login.service';
import { LoginDto } from 'src/users/dto/login-dto';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(user: LoginDto): Promise<{
        token: string;
    }>;
}
