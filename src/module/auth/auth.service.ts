import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RedisService } from '../../common/service/Redis Service/redis.service.js';
import { TokenService } from '../../common/service/Token Service/token.service.js';
import { User } from '../../database/model/user.model.js';
import { IUser } from '../../common/interfaces/user.interface.js';
import { compareHash, generateHash } from '../../common/security/security.js';
import { Send_Email } from '../../common/email/sendemail.js';
import { IPendingUser } from '../../common/interfaces/PendingUser.interface.js';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<IUser>,
        private readonly tokenService: TokenService,
        private readonly redisService: RedisService,
    ) { }
    //////////////////////////////////////////////////////////////////////////////////////////////
    async login(body: any) {

        let { password, email } = body
        let userData = await this.userModel.findOne({ email })
        if (!userData) {
            throw new NotFoundException("email not found")
        }

        let matchPassword = await compareHash({ password, hashedPassword: userData.password })
        if (!matchPassword) {
            throw new BadRequestException("invalid password")
        }

        let { accessToken, refreshToken } = await this.tokenService.generateToken({ userData });
        return { message: 'user login', accessToken, refreshToken };
    }
    //////////////////////////////////////////////////////////////////////////////////////////////

    async signup(data: any) {
        let { name, email, password, phone } = data;

        // 1. Normalize Email
        email = email.trim().toLowerCase();

        // 2. Check if user already exists
        const existsUser = await this.userModel.findOne({ email });

        if (existsUser) {
            throw new ConflictException("User Already Exist");
        }

        // 3. Hash Password
        const hashedPassword = await generateHash({ password });

        if (!hashedPassword) {
            throw new BadRequestException("Invalid Password");
        }

        // 4. Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // 5. Prepare temporary user data
        const pendingUser = {
            name,
            email,
            phone,
            password: hashedPassword,
            provider: 'System',
            otp,
        };

        // 6. Save temporary data in Redis
        const redisKey = `pending_signup::${email}`;

        await this.redisService.set({
            key: redisKey,
            value: pendingUser,
            ttl: 300,
        });

        // 7. Send OTP Email
        try {
            await Send_Email({
                to: email,
                subject: 'Verify Your Email - E-commerce App',
                html: `
                <h2>Welcome to our store, ${name}!</h2>
                <p>Your verification OTP code is:
                <b>${otp}</b></p>
            `,
            });

        } catch (error) {

            // Delete temporary data if email fails
            await this.redisService.redis_delete(redisKey);

            throw new InternalServerErrorException(
                "Failed to send verification email"
            );
        }

        // 8. Return response
        return {
            message: "OTP sent successfully. Please verify your email.",
        };
    }

    ////////////////////////////////////////////////////////////////////////////

async verify(body: any) {
    const { email, otp } = body;

    // 1. Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // 2. Get pending signup data from Redis
    const redisKey = `pending_signup::${normalizedEmail}`;

    const redisData = await this.redisService.get(redisKey);

    // 3. Check if pending data exists
    if (!redisData) {
        throw new NotFoundException(
            'Signup request expired or email not found'
        );
    }

    // 4. Convert JSON string to object
    const pendingUser: IPendingUser = JSON.parse(redisData);

    // 5. Verify OTP
    if (String(pendingUser.otp) !== String(otp)) {
        throw new BadRequestException('Invalid OTP');
    }

    // 6. Check if email already exists in MongoDB
    const existsUser = await this.userModel.findOne({
        email: normalizedEmail,
    });

    if (existsUser) {
        throw new ConflictException('User Already Exists');
    }

    // 7. Create user after successful OTP verification
    const user = await this.userModel.create({
        name: pendingUser.name,
        email: pendingUser.email,
        phone: pendingUser.phone,
        password: pendingUser.password,
        provider: pendingUser.provider,
        isVerified: true,
    });

    // 8. Delete temporary data from Redis
    await this.redisService.redis_delete(redisKey);

    return {
        message: 'User verified successfully',
        user,
    };
}

}