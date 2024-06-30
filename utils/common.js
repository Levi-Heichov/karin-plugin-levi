import fs from 'fs'
export function getRandomLineFromFile (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        const lines = JSON.parse(data)
        const randomIndex = Math.floor(Math.random() * lines.length)
        const randomLine = lines[randomIndex]
        resolve(randomLine)
      }
    })
  })
}
