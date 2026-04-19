import { Table, ReferenceColumn, StringColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_1984201_receivo_notification = Table({
    allowWebServiceAccess: true,
    index: [
        {
            name: 'index',
            unique: false,
            element: 'related_receipt',
        },
        {
            name: 'index2',
            unique: false,
            element: 'user',
        },
    ],
    label: 'Notification',
    name: 'x_1984201_receivo_notification',
    schema: {
        related_receipt: ReferenceColumn({
            label: 'Related Receipt',
            referenceTable: 'x_1984201_receivo_receipt__x_1984201_receivo_receipt_',
        }),
        user: ReferenceColumn({
            label: 'User',
            referenceTable: 'x_1984201_receivo_user__sys_user_',
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 500,
        }),
        unread: BooleanColumn({
            label: 'Unread',
        }),
        title: StringColumn({
            label: 'Title',
            maxLength: 100,
        }),
        type: StringColumn({
            label: 'Type',
        }),
    },
})
