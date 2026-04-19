import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['3864420293504390612632edfaba10d1'],
    description: 'Default access control on x_1984201_receivo_notification',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'write',
    roles: ['x_1984201_receivo.notification_user'],
    table: 'x_1984201_receivo_notification',
})
