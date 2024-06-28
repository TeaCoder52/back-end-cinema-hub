import { Injectable } from '@nestjs/common'

import * as dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { PrismaService } from 'src/prisma.service'

dayjs.locale('ru')

@Injectable()
export class StatisticsService {
	constructor(private prisma: PrismaService) {}

	async getMainStatistics() {
		const countUsers = await this.prisma.user.count()
		const countMovies = await this.prisma.movie.count()

		const countViews = await this.prisma.movie.aggregate({
			_sum: {
				views: true
			}
		})

		const averageRating = await this.prisma.review.aggregate({
			_avg: {
				rating: true
			}
		})

		return [
			{ id: 1, name: 'Просмотры', value: countViews._sum.views },
			{ id: 2, name: 'Фильмы', value: countMovies },
			{ id: 3, name: 'Пользователи', value: countUsers },
			{
				id: 4,
				name: 'Средний рейтинг',
				value: averageRating._avg.rating || 0
			}
		]
	}

	async getMiddleStatistics() {
		// Получение 4 самых популярных фильмов
		const movies = await this.prisma.movie.findMany({
			select: {
				title: true,
				views: true
			}
		})

		const topMovies = movies.sort((a, b) => b.views - a.views).slice(0, 4)

		// Получение продаж за прошедшие три недели
		const startDate = dayjs().subtract(14, 'days').startOf('day').toDate()
		const endDate = dayjs().endOf('day').toDate()

		const salesRaw = await this.prisma.payment.groupBy({
			by: ['createdAt'],
			_sum: {
				amount: true
			},
			where: {
				createdAt: {
					gte: startDate,
					lte: endDate
				}
			}
		})

		// Форматирование дат и подсчет покупок по дням
		const monthNames = [
			'янв',
			'фев',
			'мар',
			'апр',
			'мая',
			'июн',
			'июл',
			'авг',
			'сен',
			'окт',
			'ноя',
			'дек'
		]

		const formatDate = (date: Date): string => {
			return `${date.getDate()} ${monthNames[date.getMonth()]}`
		}

		const salesByDate: { [key: string]: number } = {}

		for (
			let d = new Date(startDate);
			d <= endDate;
			d.setDate(d.getDate() + 1)
		) {
			const formattedDate = formatDate(new Date(d))
			salesByDate[formattedDate] = 0
		}

		for (const sale of salesRaw) {
			const formattedDate = formatDate(new Date(sale.createdAt))
			if (salesByDate[formattedDate] !== undefined) {
				salesByDate[formattedDate] += sale._sum.amount
			}
		}

		const salesByWeek = Object.keys(salesByDate).map(date => ({
			date,
			total: salesByDate[date]
		}))

		return {
			topMovies: topMovies.map(movie => ({
				title: movie.title,
				views: movie.views
			})),
			salesByWeek
		}
	}
}
