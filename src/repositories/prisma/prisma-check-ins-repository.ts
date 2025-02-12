import dayjs from "dayjs";
import { CheCkIn, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { CheckInsRepository } from "../check-ins-repository";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {
    const checkIn = await prisma.cheCkIn.findUnique({
      where: {
        id,
      }
    })

    return checkIn
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.cheCkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate()
        }
      }
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.cheCkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return checkIns
  }
  async countByUserId(userId: string) {
    const count = await prisma.cheCkIn.count({
      where: {
        user_id: userId
      }
    })

    return count
  }
  async create(data: Prisma.CheCkInUncheckedCreateInput) {
    const checkIn = await prisma.cheCkIn.create({
      data,
    })

    return checkIn
  }
  async save(data: CheCkIn) {
    const checkIn = await prisma.cheCkIn.update({
      where: {
        id: data.id
      },
      data
    })
    return checkIn
  }
}