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

export const updateConnectionNotification = async (notificationId: string, status: number) => {
   try {
      const updatedNotification = await UserNotification.findByIdAndUpdate(
         notificationId,
         { $set: { "data.status": status } },
         { new: true }
      );
      return updatedNotification;
   } catch (error: any) {
      console.log("Error: In updateConnectionNotification", error.message);
      return false;
   }
};

export const getUserNotifications = async (userId: string) => {
   try {
      const notifications = await UserNotification.find({ user: userId });

      if (!notifications || !notifications.length) {
         return false;
      }
      return notifications;
   } catch (error: any) {
      console.log("Error : In getUserNotification", error.message);
      return false;
   }
};
