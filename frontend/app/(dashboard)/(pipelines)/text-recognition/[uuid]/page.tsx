// "use client"

import TextRecognitionPipeline from '@/components/text-recognition-pipeline'
import { TopMainContent } from '@/components/top-main-content'
import React from 'react'

export default function UploadPage() {
    return (
        <>
        <TopMainContent title="Text Recognition" />
        <TextRecognitionPipeline />
        </>
    )
}
