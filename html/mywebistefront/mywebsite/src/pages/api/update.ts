import { NextApiRequest, NextApiResponse } from 'next'
import { openDb } from './db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  // Get ID and new title/content from body
  const { id, title, content } = req.body

  // Update matching record in database
  const db = await openDb()
  await db.run(
    `UPDATE posts SET 
     title = ?, 
     content = ?  
     WHERE id = ?`,
    [title, content, id]
  )
  await db.close()
  
  // Return result to client
  res.status(200).json({ message: 'Post updated' })

}

export default handler