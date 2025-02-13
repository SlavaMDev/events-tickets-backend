import { Injectable, UnauthorizedException } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { User } from '../user/user.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private readonly filePath: string;
    constructor(private configService: ConfigService) {
        this.filePath = `${this.configService.get<string>('USERS_DATA_FILE')}`;
    }
    async login(createUserDto: Partial<User>): Promise<{ user: Partial<User> }> {
        const { email } = createUserDto;
        const data: string = await readFile(this.filePath, { encoding: 'utf8' });
        const users = JSON.parse(data);
        const user: User = users.find((user: User) => user.email === email);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        return { user: {name: user.name, type: user.type} };
    }
}
