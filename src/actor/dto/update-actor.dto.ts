import { IsString } from 'class-validator'

export class UpdateActorDto {
	@IsString()
	name: string

	@IsString()
	photoUrl: string
}
