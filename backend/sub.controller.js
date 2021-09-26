import webpush from 'web-push';

const publicVapidKey = 'BJnpUq6ns8Yy-9EZOav4EzDu8l3Gk866Ioi1845F3QDSNCw1JONEQdNBKExjgxRzi5HFwXGqZK1Wp_3RYxn4gzU';
const privateVapidKey = 'qEmRBt14tVoOwv7SwQTbQlqAYqnGKG6K2djD5RJED4E';

const pushSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/eNwE85aAaHE:APA91bGnXIiX77CQA--iGvKF_SNm5ND3pOn5VIdyQX1WIhHZRUFugZwZHmbabyJTCOhX5DmyKBm_Bx42ACFQAc7z9sv7UWH1Nkoyn8A5_y_eTi873h-k71-NKrpM7-5TPNAY5hcNACD8',
    keys: {
        auth: 'VkTdMl_DHKQpoGqXnVcH2g',
        p256dh: 'BIE__Esm4nVgi-kHpfDois0I7TmU8-0YEKbMcdsYxLidWhF998Q3dxOnzG4pQaiHoxSFR5kT--jG0Kw8BmE5gA0',
    }
};
export const SubscriptionController = {

    subscribe: (req, res) => {
        const subscription = req.body;
        console.log('subscription', subscription);
        res.status(201).json({ message: 'subscription received'});
    },

    sendNotification: () => {
        webpush.setVapidDetails('mailto:s0563102@htw-berlin.de', publicVapidKey, privateVapidKey);
        const payload = JSON.stringify({
            title: 'New Push Notification',
            content: 'New data in database!',
            openUrl: '/help'
        });
        webpush.sendNotification(pushSubscription,payload)
            .catch(err => console.error(err));
        console.log('push notification sent');
        // res.status(201).json({ message: 'push notification sent'});
    }
}