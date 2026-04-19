import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['a864420293504390612632edfaba103b'],
    description: 'Default access control on x_1984201_receivo_receipt__x_1984201_receivo_receipt_',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'read',
    roles: ['x_1984201_receivo.notification_user'],
    table: 'x_1984201_receivo_receipt__x_1984201_receivo_receipt_',
})
