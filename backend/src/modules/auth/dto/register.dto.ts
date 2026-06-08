import { IsEmail, IsString, MinLength, MaxLength, IsEnum, IsOptional, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'anna@example.com' })
  @IsEmail({}, { message: 'Ange en giltig e-postadress' })
  email: string;

  @ApiProperty({ example: 'MinSäkraLösenord123!' })
  @IsString()
  @MinLength(8, { message: 'Lösenordet måste vara minst 8 tecken' })
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Lösenordet måste innehålla minst en stor bokstav, en liten bokstav och en siffra',
  })
  password: string;

  @ApiProperty({ example: 'Anna' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ example: 'Svensson' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName: string;

  @ApiPropertyOptional({ example: '+46701234567' })
  @IsOptional()
  @IsString()
  @Matches(/^\+46\d{9}$/, { message: 'Ange ett giltigt svenskt telefonnummer (+46XXXXXXXXX)' })
  phone?: string;

  @ApiPropertyOptional({ enum: UserRole, default: UserRole.CUSTOMER })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Ogiltig roll' })
  role?: UserRole;
}
