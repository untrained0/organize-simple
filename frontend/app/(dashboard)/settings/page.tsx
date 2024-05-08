import { TopMainContent } from '@/components/top-main-content'
import React from 'react'

export default function SettingsPage() {
    return (
        <>
        <TopMainContent title="Settings" displayUploadButton />
        <div className='m-4'>
            <h1>This is settings page</h1> 
        </div>
        </>
    )
}
