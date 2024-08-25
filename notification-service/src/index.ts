import 'dotenv/config';
import cron from 'node-cron';
import TwoDaysInterval from "./intervals/twoDaysInterval";
import TwoHoursInterval from "./intervals/twoHoursInterval";
import NotificationSender from "./services/notificationSender";

async function main() {
    let service = new NotificationSender([
        new TwoDaysInterval(),
        new TwoHoursInterval()
    ]);

    console.log("Notification service successfully started!");

    cron.schedule('*/5 * * * *', () => {
        service.start();
    });
}

main();
