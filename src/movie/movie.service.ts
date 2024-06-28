import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { returnMovieObject } from './return-movie.object'

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) return this.search(searchTerm)

		return this.prisma.movie.findMany({
			select: returnMovieObject,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	private async search(searchTerm: string) {
		return this.prisma.movie.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			}
		})
	}

	async getBySlug(slug: string) {
		const movie = await this.prisma.movie.findUnique({
			where: {
				slug
			},
			select: returnMovieObject
		})

		if (!movie) throw new NotFoundException('Фильм не найден')

		return movie
	}

	async getMostPopular() {
		return this.prisma.movie.findMany({
			orderBy: {
				views: 'desc'
			},
			include: {
				actors: true,
				genres: true
			},
			take: 8
		})
	}

	async getByActor(actorId: string) {
		return this.prisma.movie.findMany({
			where: {
				actors: {
					some: {
						id: actorId
					}
				}
			}
		})
	}

	async getByGenres(genreIds: string[]) {
		return this.prisma.movie.findMany({
			where: {
				genres: {
					some: {
						id: {
							in: genreIds
						}
					}
				}
			}
		})
	}

	async updateCountViews(slug: string) {
		return this.prisma.movie.update({
			where: {
				slug
			},
			data: {
				views: {
					increment: 1
				}
			}
		})
	}

	/* Запросы для админа */

	async getById(id: string) {
		const movie = await this.prisma.movie.findUnique({
			where: {
				id
			},
			select: returnMovieObject
		})

		if (!movie) throw new NotFoundException('Фильм не найден')

		return movie
	}

	async create() {
		const movie = await this.prisma.movie.create({
			data: {
				title: '',
				slug: '',
				bigPoster: '',
				poster: '',
				videoUrl: '',
				actors: {
					connect: []
				},
				genres: {
					connect: []
				}
			}
		})

		return movie.id
	}

	async update(id: string, dto: UpdateMovieDto) {
		return this.prisma.movie.update({
			where: {
				id
			},
			data: {
				title: dto.title,
				slug: generateSlug(dto.title),
				poster: dto.poster,
				bigPoster: dto.bigPoster,
				videoUrl: dto.videoUrl,
				country: dto.country,
				year: dto.year,
				duration: dto.duration,
				genres: {
					set: dto.genres?.map(genreId => ({ id: genreId })),
					disconnect: dto.genres
						?.filter(genreId => !dto.genres.includes(genreId))
						.map(genreId => ({ id: genreId }))
				},
				actors: {
					set: dto.actors?.map(actorId => ({ id: actorId })),
					disconnect: dto.actors
						?.filter(actorId => !dto.actors.includes(actorId))
						.map(actorId => ({ id: actorId }))
				}
			}
		})
	}

	async delete(id: string) {
		return this.prisma.movie.delete({
			where: {
				id
			}
		})
	}
}
