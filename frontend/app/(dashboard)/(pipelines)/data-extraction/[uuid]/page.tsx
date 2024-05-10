// "use client"

import DataExtractionPipeline from '@/components/data-extraction-pipeline'
import { TopMainContent } from '@/components/top-main-content'
import React from 'react'

export default function UploadPage() {
    return (
        <>
        <TopMainContent title="Data Extraction" />
        <DataExtractionPipeline />
        </>
    )
}
