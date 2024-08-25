import { PrismaClient } from "my-prisma-client";
import { EmailNotificationService } from "./emailNotificationService";
import { INotificationService } from "./notificationService";
import ScheduleRepository from "../repository/scheduleRepository";
import NotificationInterval from "../intervals/notificationInterval";

export default class NotificationSender {
    private services: INotificationService[] = [];
    private repo: ScheduleRepository = new ScheduleRepository();
    
    constructor(private readonly notifyIntervals: NotificationInterval[]) {
        this.services = [
            new EmailNotificationService(
                process.env.EMAIL_SERVICE,
                process.env.EMAIL_NAME,
                process.env.EMAIL_PASSWORD
            )
        ]
    }

    public async start(): Promise<void> {
        for(let service of this.services) {
            for(let interval of this.notifyIntervals) {
                let serviceName = service.getNotificationTypeName();
                let unnotified = await this.repo.getUnnotifiedSchedules(interval.getMinutes(), serviceName);

                for(let schedule of unnotified) {
                    await service.notify(schedule.patient, interval.getText(schedule));
                    await this.repo.setNotified(schedule.id, interval.getMinutes(), serviceName);
                }
            }
        }
    }
}