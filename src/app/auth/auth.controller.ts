import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/schema/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() createUserDto: Partial<User>) {
        return this.authService.signup(createUserDto);
    }

    @Post('login')
    async login(@Body() createUserDto: Partial<User>) {
        return this.authService.login(createUserDto);
    }
}
