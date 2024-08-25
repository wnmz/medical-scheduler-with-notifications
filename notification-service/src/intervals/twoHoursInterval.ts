import NotificationInterval from "./notificationInterval";

export default class TwoHoursInterval extends NotificationInterval {
    getText(schedule: any): string {
        const currentDate = new Date().toLocaleDateString();
        const patientName = schedule.patient.name;
        const doctorName = schedule.timeSlot.doctorSpecsPrice.doctor.name;
        const doctorSpec = schedule.timeSlot.doctorSpecsPrice.spec.name;
        const appointmentTime = new Date(schedule.timeSlot.startTime).toLocaleTimeString();

        return `${currentDate} | Привет ${patientName}! Через 2 часа у вас приём у ${doctorSpec} (${doctorName}) в ${appointmentTime}!`;
    }

    getMinutes(): number {
        return 2 * 60;
    }
}