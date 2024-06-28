import { UserRole } from '@prisma/client'
import { IsEmail, IsEnum, IsString } from 'class-validator'

export class UpdateUserDto {
	@IsString()
	name: string

	@IsEmail()
	email: string

	@IsEnum(UserRole)
	role: UserRole
}
