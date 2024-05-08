import { TopMainContent } from '@/components/top-main-content'
import React from 'react'

export default function ReceiptsPage() {
    return (
        <>
        <TopMainContent title="Receipts" displayUploadButton />
        <div className='m-4'>
            <h1>This is receipts page</h1> 
        </div>
        </>
    )
}
