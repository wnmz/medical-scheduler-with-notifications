export default abstract class NotificationInterval {
    abstract getText(shedule: any): string
    abstract getMinutes(): number
}