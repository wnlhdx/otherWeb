import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="semiFlat">
      {children}
    </div>
  )
}