import { BusinessRule } from '@servicenow/sdk/core';

export const ReceiptUploadNotification = BusinessRule({
    $id: Now.ID['br_notify_on_upload'], 
    name: 'ReceiVo - Notify on Upload',
    table: 'x_1984201_receivo_receipt',
    when: 'after',
    action: ['insert'], 
    script: `
        (function executeRule(current, previous) {
            // 1. Create a new record in our Notification table
            var notifGr = new GlideRecord('x_1984201_receivo_notification');
            notifGr.initialize();
            
            // 2. Safely grab the store name from the receipt
            var storeName = current.getValue('store_name') || current.getValue('u_store') || 'a store';
            
            // 3. Populate the notification fields to match your React UI
            notifGr.setValue('title', 'Receipt Uploaded Successfully');
            notifGr.setValue('description', 'A new receipt from ' + storeName + ' has been saved to your vault.');
            notifGr.setValue('type', 'success');
            
            // Assign to the currently logged-in user
            notifGr.setValue('user', gs.getUserID());
            notifGr.setValue('unread', true);
            notifGr.setValue('related_receipt', current.getUniqueValue());
            
            // 4. Save to database
            notifGr.insert();
            
        })(current, previous);
    `
});