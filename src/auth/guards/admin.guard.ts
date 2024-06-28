import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { User, UserRole } from '@prisma/client'

@Injectable()
export class OnlyAdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: User }>()
		const user = request.user

		if (user.role !== UserRole.ADMIN)
			throw new ForbiddenException(
				'У вас недостаточно прав для выполнения этой операции'
			)

		return true
	}
}
