const cron = require('node-cron');
const Notification = require('../models/Notification'); 

async function deleteOldNotifications() {
  const currentDate = new Date();
  const oneDayAgo = new Date(currentDate);
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  try {
    const result = await Notification.deleteMany({
      createdAt: { $lt: oneDayAgo },
    });

    console.log(`Deleted ${result.deletedCount} notifications.`);
  } catch (err) {
    console.error('Error deleting old notifications:', err);
  }
}

const notificationJob = cron.schedule('0 0 * * *', () => {
  deleteOldNotifications();
});

module.exports = notificationJob;


