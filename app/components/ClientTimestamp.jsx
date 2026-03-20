'use client'

import { useEffect } from 'react'

export default function ClientTimestamp({ value, id }) {
  useEffect(() => {
    if (!id) return
    const el = document.getElementById(id)
    if (!el) return
    // Update the server-rendered placeholder with the client value
    el.textContent = value || ''
  }, [value, id])

  return null
}
