import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['1064020293504390612632edfaba1079'],
    description: 'Default access control on x_1984201_receivo_user__sys_user_',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'write',
    roles: ['x_1984201_receivo.notification_user'],
    table: 'x_1984201_receivo_user__sys_user_',
})
