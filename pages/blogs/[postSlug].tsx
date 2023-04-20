import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';

//trying to turn md into content for page
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"


type Props = InferGetStaticPropsType<typeof getStaticProps>;


//this is the dynamic route
//"NextPage" type specidies the props that will be recieved 
const SinglePage: NextPage<Props> = ({ post }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Loading...</p>
    }
   //This extracts the content and title of the post from the post prop that was passed in from getStaticProps.
    const { content, title } = post

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="font-semibold text-2xl py-5">{title}</h1>
            {/* prose is magic- organized the content on frontend */}
            <div className="prose pb-20">
                {/* This is rendering the content (passed via props above) using the MDXRemote component from the next-mdx-remote package */}
                <MDXRemote {...content} />

            </div>
        </div>
    )
};

//The getStaticPaths function in a Next.js page is used to specify the dynamic routes that should be pre-rendered at build time. When a Next.js application is built, it pre-renders all the pages that are specified in the getStaticPaths function and generates HTML files for them, which are then served by the server.
export const getStaticPaths: GetStaticPaths = () => {
    //reading paths
    //see description of events at posts.ts
    //This reads the directory where the markdown files are stored and maps over them to generate an array of objects that specify the dynamic routes for each post.
    const dirPathToRead = path.join(process.cwd(), "posts")
    const dirs = fs.readdirSync(dirPathToRead)
    const paths = dirs.map(filename => {
        const filePathToRead = path.join(process.cwd(), "posts/" + filename)
        const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" })
        
        //This uses the gray-matter package to extract the slug data from the front matter of the markdown file and returns it as a parameter for the dynamic route.
        return { params: { postSlug: matter(fileContent).data.slug } }
    })

    return {
        //paths is from above (the array)
        paths,

        //fallback options
        //false=> will return 404 page for new unknown slug
        //blocking => will see the slug, try to get data form static pages, and if there is page, it will frist hang the browser and try to geberate new page
        //true => return the fake page for some time and one thre data is ready it will serve them page props
        fallback: 'blocking',

    }
}
//interface adds a postSlug property of type string to the query parameters.
interface IStaticProps extends ParsedUrlQuery {
    postSlug: string
}
//defines the shape of the data that will be passed as props to the SinglePage component
type Post = {
    post: {
        title: string;
        content: MDXRemoteSerializeResult;
    }
}

//allows you to fetch data at build time and pass it as props to a Next.js page component
//rather than generated on the fly at runtime for each request
// returns the props that will be passed to the SinglePage component
//context => an object containing information about the request, including the query parameters
export const getStaticProps: GetStaticProps<Post> = async (context) => {
    try {
        const { params } = context;

        //context extracts the postSlug parameter from the query parameters using destructuring and casts it to the IStaticProps type
        const { postSlug } = params as IStaticProps;

        const filePathToRead = path.join(process.cwd(), "posts/" + postSlug + '.md')
        const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" })

        //reads the contents of the markdown file corresponding to the postSlug 
        //using fs.readFileSync and 
        //passes it to the serialize function from next-mdx-remote 
        //to convert it to an MDXRemoteSerializeResult object mentioned above
        const source: any = await serialize(fileContent, { parseFrontmatter: true })

        return {
            props: {
                post: {

                    //the MDXRemoteSerializeResult object 
                    content: source,

                    // title is extracted from the frontmatter of the markdown file
                    title: source.frontmatter.title
                }
            }
        }
    } catch (error) {
        return{
            //404 error
            notFound: true
        }
    }




}


export default SinglePage;