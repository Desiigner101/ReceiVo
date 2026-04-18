import { Table, Column } from '@servicenow/sdk/core';

export const NotificationTable = Table({
    name: 'x_1984201_receivo_notification',
    label: 'ReceiVo Notification',
    schema: {
        title: Column({
            label: 'Title',
            type: 'string',
            maxLength: 100
        }),
        description: Column({
            label: 'Description',
            type: 'string',
            maxLength: 500
        }),
        type: Column({
            label: 'Type',
            type: 'choice',
            choices: {
                'success': { label: 'Success' },
                'warning': { label: 'Warning' },
                'info': { label: 'Info' }
            }
        }),
        user: Column({
            label: 'User',
            type: 'reference',
            referenceTable: 'sys_user'
        }),
        unread: Column({
            label: 'Unread',
            type: 'boolean',
            defaultValue: true
        }),
        related_receipt: Column({
            label: 'Related Receipt',
            type: 'reference',
            referenceTable: 'x_1984201_receivo_receipt'
        })
    }
});