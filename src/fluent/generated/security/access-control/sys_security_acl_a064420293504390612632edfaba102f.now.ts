import { Acl } from '@servicenow/sdk/core'

Acl({
    $id: Now.ID['a064420293504390612632edfaba102f'],
    description: 'Default access control on x_1984201_receivo_receipt__x_1984201_receivo_receipt_',
    localOrExisting: 'Existing',
    type: 'record',
    operation: 'create',
    roles: ['x_1984201_receivo.notification_user'],
    table: 'x_1984201_receivo_receipt__x_1984201_receivo_receipt_',
})
