// "use client"

import UploadContent from '@/components/UploadContent'
import { TopMainContent } from '@/components/top-main-content'
import VerificationPipeline from '@/components/verification-pipeline'
import React from 'react'

export default function UploadPage() {
    return (
        <>
        <TopMainContent title="Verification" />
        <VerificationPipeline />
        </>
    )
}
