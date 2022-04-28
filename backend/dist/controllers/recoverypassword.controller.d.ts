import { RecoveryPasswordService } from '../services/recoverypassword.service';
export declare class RecoveryPasswordController {
    private readonly recoveryPasswordService;
    constructor(recoveryPasswordService: RecoveryPasswordService);
    resetPassword(cpf: string): Promise<{
        "new password": any;
    }>;
}
