import { Prisma } from '@prisma/client'
import { returnActorObject } from 'src/actor/return-actor.object'
import { returnGenreObject } from 'src/genre/return-genre.object'
import { returnReviewObject } from 'src/review/return-review.object'

export const returnMovieObject: Prisma.MovieSelect = {
	id: true,
	createdAt: true,
	title: true,
	slug: true,
	poster: true,
	bigPoster: true,
	videoUrl: true,
	views: true,
	country: true,
	year: true,
	duration: true,
	reviews: {
		orderBy: {
			createdAt: 'desc'
		},
		select: returnReviewObject
	},
	actors: {
		select: returnActorObject
	},
	genres: {
		select: returnGenreObject
	}
}
