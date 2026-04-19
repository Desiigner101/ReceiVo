import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['bc64420293504390612632edfaba10dd'],
    description: 'Default access control on x_1984201_receivo_notification',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'delete',
    roles: ['x_1984201_receivo.notification_user'],
    table: 'x_1984201_receivo_notification',
})
