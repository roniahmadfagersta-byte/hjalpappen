import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({ example: '+46701234567' })
  @IsString()
  @Matches(/^\+46\d{9}$/, { message: 'Ange ett giltigt svenskt telefonnummer (+46XXXXXXXXX)' })
  phone: string;
}

export class VerifyPhoneDto {
  @ApiProperty({ example: '+46701234567' })
  @IsString()
  @Matches(/^\+46\d{9}$/, { message: 'Ange ett giltigt svenskt telefonnummer (+46XXXXXXXXX)' })
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Matches(/^\d{6}$/, { message: 'OTP-koden måste vara 6 siffror' })
  code: string;
}
