const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = async (request, response) => {
  const allArticles = await prisma.request.findMany()
  console.log(allArticles)
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  try {
    const req = await fetch(url)
    const data = await req.json()
    response.status(200).send(data.articles)
  } catch (error) {
    response.status(500)
  }
}
