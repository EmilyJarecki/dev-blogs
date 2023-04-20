import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { ParsedUrlQuery } from 'querystring';

//trying to turn md into content for page
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"


type Props = InferGetStaticPropsType<typeof getStaticProps>


//this is the dynamic route
//"NextPage" type specidies the props that will be recieved 
const SinglePage: NextPage<Props> = ({ post }) => {
    const { content, title } = post
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="font-semibold text-2xl py-5">{title}</h1>
            {/* prose is magic */}
            <div className="prose pb-20">
                <MDXRemote {...content} />

            </div>
        </div>
    )
};

//The getStaticPaths function in a Next.js page is used to specify the dynamic routes that should be pre-rendered at build time. When a Next.js application is built, it pre-renders all the pages that are specified in the getStaticPaths function and generates HTML files for them, which are then served by the server.
export const getStaticPaths: GetStaticPaths = () => {
    //reading paths
    //see description of events at posts.ts
    const dirPathToRead = path.join(process.cwd(), "posts")
    const dirs = fs.readdirSync(dirPathToRead)
    const paths = dirs.map(filename => {
        const filePathToRead = path.join(process.cwd(), "posts/" + filename)
        const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" })
        return { params: { postSlug: matter(fileContent).data.slug } }
    })
    console.log(paths)

    return {
        //paths is from above
        paths,

        //Next.js will return a 404 page if a user requests a path that is not specified in the paths array.
        fallback: false,

    }
}

interface IStaticProps extends ParsedUrlQuery {
    postSlug: string
}
type Post = {
    post: {
        title: string;
        content: MDXRemoteSerializeResult;
    }
}

//allows you to fetch data at build time and pass it as props to a Next.js page component
//rather than generated on the fly at runtime for each request
export const getStaticProps: GetStaticProps<Post> = async (context) => {
    const { params } = context;
    const { postSlug } = params as IStaticProps;

    const filePathToRead = path.join(process.cwd(), "posts/" + postSlug + '.md')
    const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" })

    // const { content, data } = matter(fileContent)
    const source: any = await serialize(fileContent, { parseFrontmatter: true })

    return {
        props: {
            post: {
                content: source,
                title: source.frontmatter.title
            }
        }
    }
}


export default SinglePage;