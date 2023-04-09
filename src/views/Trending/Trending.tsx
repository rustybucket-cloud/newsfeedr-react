import React from 'react'
import { Articles } from '../../components'
import type { Article } from '../../types'

// create mock data based on the Article type
const mockData: Article[] = [
  {
    title: 'Article 1',
    description: 'Description 1',
    url: 'https://www.google.com',
    urlToImage: 'https://www.google.com',
    author: 'Author 1',
    content: 'Content 1',
    publishedAt: '2021-08-01T00:00:00Z',
    source: {
      id: 'google',
      name: 'Google'
    }
  }
]

export default function Trending (): JSX.Element {
  return (
    <div>
      <Articles articles={mockData} />
    </div>
  )
}
