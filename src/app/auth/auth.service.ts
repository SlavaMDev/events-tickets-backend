import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
    constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      private jwtService: JwtService
    ) {}

    async signup(createUserDto: Partial<User>): Promise<{token: string; user: Partial<User>}> {
        const { name, email, password, type } = createUserDto;
        const trimmedPassword = password?.trim();
        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new ConflictException('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
        const user = new this.userModel({ name, email, password: hashedPassword, type });
        await user.save();
        const payload = { id: user._id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { token, user: {name: user.name, type: user.type} };
    }

    async login(createUserDto: Partial<User>): Promise<{ token: string; user: Partial<User> }> {
        const { email, password } = createUserDto;
        const trimmedPassword = password?.trim();
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const isMatch = await bcrypt.compare(trimmedPassword, user.password.trim());
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        const payload = { id: user._id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { token, user: {name: user.name, type: user.type} };
    }
}
