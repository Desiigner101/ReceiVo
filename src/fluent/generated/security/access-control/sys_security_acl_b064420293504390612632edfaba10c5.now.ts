import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['b064420293504390612632edfaba10c5'],
    description: 'Default access control on x_1984201_receivo_notification',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'read',
    roles: ['x_1984201_receivo.notification_user'],
    table: 'x_1984201_receivo_notification',
})
