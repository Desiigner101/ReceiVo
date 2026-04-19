import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['ec64020293504390612632edfaba1091'],
    description: 'Default access control on x_1984201_receivo_user__sys_user_',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'delete',
    roles: ['x_1984201_receivo.notification_user'],
    table: 'x_1984201_receivo_user__sys_user_',
})
