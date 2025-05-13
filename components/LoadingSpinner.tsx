'use client'

import React from 'react'
import './LoadingSpinner.css'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    </div>
  )
}
