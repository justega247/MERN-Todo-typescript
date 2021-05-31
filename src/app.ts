import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"

const app: express.Application = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use(todoRoutes)


const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ir2an.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose.connect(uri, options)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on localhost:${PORT}`);
      
    })
  }).catch(error => {
    throw error
  })