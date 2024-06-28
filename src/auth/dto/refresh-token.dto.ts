import { IsString } from 'class-validator'

export class RefreshTokenDto {
	@IsString({
		message: 'Вы не передали refresh токен или это не строка!'
	})
	refreshToken: string
}
