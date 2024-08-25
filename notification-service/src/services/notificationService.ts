import { Patient } from "my-prisma-client";

export abstract class INotificationService {
    abstract notify(patient: Patient, text: string): Promise<void>;
    abstract getNotificationTypeName(): string;
}
