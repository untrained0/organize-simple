import { TopMainContent } from '@/components/top-main-content'
import React from 'react'

export default function DashboardPage() {
    return (
        <>
        <TopMainContent title="Dashboard" displayUploadButton />
        <div className='m-4'>
            <h1>Dashboard</h1> 
        </div>
        </>
    )
}
