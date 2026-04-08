import { Table, Column } from '@servicenow/sdk/core';

export const ReceiptTable = Table({
    name: 'x_1984201_receivo_receipt',
    label: 'Receipt Record',
    schema: { 
        store_name: Column.Choice({ 
            label: 'Store Choice', 
            choices: {
                'watsons': { label: 'Watsons' },
                'mercury_drug': { label: 'Mercury Drug' },
                'southstar_drug': { label: 'Southstar Drug' },
                'other': { label: 'Other' }
            }
        }),
        specific_store: Column.String({ 
            label: 'Specific Store', 
            maxLength: 150 
        }),
        receipt_image: Column.FileAttachment({ 
            label: 'Receipt Image' 
        }),
        total_amount: Column.Currency({ 
            label: 'Total Amount' 
        }),
        category_choice: Column.Choice({ 
            label: 'Category', 
            choices: {
                'medication': { label: 'Medication' },
                'medical_device': { label: 'Medical Device' }
            } 
        }),
        purchase_date: Column.Date({ 
            label: 'Purchase Date' 
        })
    }
});