import { Notification, PrismaClient, Schedule } from "my-prisma-client";

export default class ScheduleRepository {
    private _repo: PrismaClient = new PrismaClient();

    public async getUnnotifiedSchedules(minutes: number, notificationType: string) {
        const currentTime = new Date();
        const maxTime = new Date(currentTime.getTime() + minutes * 60 * 1000);

        return this._repo.schedule.findMany({
            where: {
                startTime: {
                    gt: currentTime,
                    lte: maxTime
                },
                OR: [
                    // Case 1: Schedule has no notifications at all
                    {
                        Notifications: {
                            none: {},
                        }
                    },
                    // Case 2: Schedule has notifications, but none of the specified type with the correct interval
                    {
                        Notifications: {
                            some: {
                                type: notificationType,
                                intervals: {
                                    some: {
                                        minutes: minutes,
                                        is_sent: false,
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            include: {
                patient: true,
                timeSlot: {
                    include: {
                        doctorSpecsPrice: {
                            include: {
                                doctor: true,
                                spec: true
                            }
                        },
                    },
                },
            },
        });
    }

    public async setNotified(schedule_id: string, interval: number, type: string): Promise<Notification> {
        return this._repo.notification.create({
            data: {
                type: type,
                schedule: {
                    connect: { id: schedule_id }
                },
                intervals: {
                    create: [
                        {
                            minutes: interval,
                            is_sent: true
                        }
                    ]
                }
            }
        });
    }
}
