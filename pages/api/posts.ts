//a type definition for the request handler function that the API endpoint will use
import { NextApiHandler } from "next";

//a library used to parse metadata from Markdown files (our posts)
import matter from 'gray-matter'

//Node.js' file system module used to read files from the file system
import fs from 'fs'

//Node.js' path module used to join file paths together.
import path from 'path'
//https://nodejs.dev/en/learn/working-with-folders-in-nodejs/ 

//this is the request handler function for the API endpoint
//req: HTTP request object
//res: represents the HTTP response object
const handler: NextApiHandler = (req, res) => {
    const { method } = req;

    //switch: a type of "if"
    switch (method) {
        case "GET": {
            //this function will read the metadata from the markdown files
            //will return an array of objects representing each post ('data')
            const data = readPostsInfo();
            return res.json({ postInfo: data });
        }

        default:
            return res.status(404).send("Not Found")
    }
}
const readPostsInfo = () => {
    //used to join the posts directory path with the current working directory of the Node.js process
    const dirPathToRead = path.join(process.cwd(), 'posts')

    //returns names of all files in 'posts'
    const dirs = fs.readdirSync(dirPathToRead)

    //iteraties over dirs content
    const data = dirs.map(filename => {

        const filePathToRead = path.join(process.cwd(), 'posts/' + filename)

        //read content of each file
        //{encoding: "utf-8"} specifies what encoding to use. if this weren't here, the fs.readFileSync() would return a Buffer Object (raw binary data)
        const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" })

        //uses gray-matter to parse data from fileContent
        //map returns array
        return matter(fileContent).data
    })
    return data;
}


export default handler;