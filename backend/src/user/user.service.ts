import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// 1. Định nghĩa kiểu dữ liệu cho Payload để tránh lỗi "any"
interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // ... (Hàm register giữ nguyên)
  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return { message: 'Đăng ký thành công', email: newUser.email };
  }

  // ... (Hàm login giữ nguyên)
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const payload: JwtPayload = { sub: user._id.toString(), email: user.email }; // Ép kiểu string cho ID

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '15m' }),
      this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
      },
    };
  }

  // 3. REFRESH TOKEN (Đã sửa lỗi)
  async refreshToken(token: string) {
    if (!token) throw new UnauthorizedException('Refresh Token không tồn tại');

    try {
      // SỬA LỖI 1: Thêm <JwtPayload> để báo cho TS biết kiểu dữ liệu trả về
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      // Tạo Access Token MỚI
      const newPayload = { sub: payload.sub, email: payload.email };
      const accessToken = await this.jwtService.signAsync(newPayload, {
        expiresIn: '15m',
      });

      return { accessToken };
    } catch {
      // SỬA LỖI 2: Bỏ chữ (error) đi vì không dùng đến
      throw new UnauthorizedException(
        'Refresh token đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.',
      );
    }
  }

  // 4. LẤY PROFILE USER (Đã sửa lỗi)
  async getProfile(token: string) {
    try {
      // SỬA LỖI 1: Thêm <JwtPayload>
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      const user = await this.userModel
        .findById(payload.sub) // Giờ payload.sub đã được hiểu là string
        .select('-password');

      return user;
    } catch {
      // SỬA LỖI 2: Bỏ (error)
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }
}
