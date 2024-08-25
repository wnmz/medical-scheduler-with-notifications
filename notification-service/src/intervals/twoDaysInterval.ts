import NotificationInterval from "./notificationInterval";

export default class TwoDaysInterval extends NotificationInterval {
    getText(schedule: any): string {
        const currentDate = new Date().toLocaleDateString();
        const patientName = schedule.patient.name;
        const doctorName = schedule.timeSlot.doctorSpecsPrice.doctor.name;
        const doctorSpec = schedule.timeSlot.doctorSpecsPrice.spec.name;
        const appointmentTime = new Date(schedule.timeSlot.startTime).toLocaleTimeString();

        return `${currentDate} | Привет ${patientName}! Напоминаем, что вы записаны к ${doctorSpec} (${doctorName}) завтра в ${appointmentTime}!`;
    }

    getMinutes(): number {
        return 2 * (24 * 60);
    }
}
