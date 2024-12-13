import { UserNotification } from "../models/UserNotification";

interface NotificationData {
   user: string;
   type: number;
   data: Record<string, unknown>;
}

export const setConnectionNotification = async ({
   user,
   type,
   data,
}: NotificationData): Promise<void> => {
   try {
      const notification = new UserNotification({
         user,
         type,
         data,
      });
      await notification.save();
   } catch (error: any) {
      console.log("Error : In Connection Notification", error.message);
   }
};

export const getUserNotifications = async (userId: string) => {
   try {
      const notifications = await UserNotification.find({ user: userId });

      console.log("notifications", notifications);

      if (!notifications || !notifications.length) {
         return false;
      }
      return notifications;
   } catch (error: any) {
      console.log("Error : In getUserNotification", error.message);
      return false;
   }
};
