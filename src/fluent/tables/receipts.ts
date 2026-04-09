import { Table, Column } from '@servicenow/sdk/core';

export const ReceiptTable = Table({
    name: 'x_1984201_receivo_receipt',
    label: 'Receipt Record',
    schema: { 
        store_name: Column({
            label: 'Store Choice',
            type: 'choice',
            choices: {
                'watsons': { label: 'Watsons' },
                'mercury_drug': { label: 'Mercury Drug' },
                'southstar_drug': { label: 'Southstar Drug' },
                'other': { label: 'Other' }
            }
        }),
        specific_store: Column({
            label: 'Specific Store',
            type: 'string',
            maxLength: 150
        }),
        receipt_image: Column({
            label: 'Receipt Image',
            type: 'attachment'
        }),
        total_amount: Column({
            label: 'Total Amount',
            type: 'currency'
        }),
        category_choice: Column({
            label: 'Category',
            type: 'choice',
            choices: {
                'medication': { label: 'Medication' },
                'medical_device': { label: 'Medical Device' }
            }
        }),
        purchase_date: Column({
            label: 'Purchase Date',
            type: 'glide_date'
        })
    }
});