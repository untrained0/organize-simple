import { TopMainContent } from '@/components/top-main-content'
import React from 'react'

export default function InvoicesPage() {
    return (
        <>
        <TopMainContent title="Invoices" displayUploadButton />
        <div className='m-4'>
            <h1>This is invoices page</h1> 
        </div>
        </>
    )
}
