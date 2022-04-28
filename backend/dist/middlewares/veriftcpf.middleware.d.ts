import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class VeriftCPFMiddleware implements NestMiddleware {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    use(req: Request, res: Response, next: () => void): Promise<void>;
}
