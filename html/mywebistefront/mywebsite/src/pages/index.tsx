import React, { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [plans, setPlans] = useState([])
  const [plan, setPlan] = useState({ title: '', content: '', startTime: '', endTime: '' });


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPlan({ title: '', content: '', startTime: '', endTime: '' });
    setPlans([...plans, plan])
  }

  return (
    <>
      <Head>
        <title>Personal Plan Management</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={plan.title}
          onChange={(e) => setPlan({ ...plan, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          value={plan.content}
          onChange={(e) => setPlan({ ...plan, content: e.target.value })}
          placeholder="Content"
        />
        <input
          type="time"
          value={plan.startTime}
          onChange={(e) => setPlan({ ...plan, startTime: e.target.value })}
          placeholder="Start Time"
        />
        <input
          type="time"
          value={plan.endTime}
          onChange={(e) => setPlan({ ...plan, endTime: e.target.value })}
          placeholder="End Time"
        />
        <button type="submit">Add Plan</button>
      </form>
      <h2>Your Plans:</h2>
      <ul>
        {plans.map((p, index) => (
          <li key={index}>
            {p.title} - {p.content} - {p.startTime} to {p.endTime}
          </li>
        ))}
      </ul>
    </>
  )
}