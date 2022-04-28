import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("../users/entities/user.entity").User[]>;
    findOne(cpf: string): Promise<import("../users/entities/user.entity").User>;
    create(createUserDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../users/entities/user.entity").User>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
