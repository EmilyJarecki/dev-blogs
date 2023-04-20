import { InferGetStaticPropsType, NextPage } from "next";
import BlogCard from "@/components/BlogCard";

//Importing the readPostsInfo function from the helper.ts module
import { readPostsInfo } from "@/lib/helper";

//Importing the PostApiResponse type that is title, slug, meta
import { PostApiResponse } from "@/utils/types";



export const getStaticProps = async () => {

    //readPostsInfo gets array of blog posts from the file system, 
    //and returns it as a prop named posts
    const postInfo: PostApiResponse = readPostsInfo()

    return {
        //the data fetched via function in helper.ts is passed via props name "post"
        props: { posts: postInfo },
    }
}
//InferGetStaticPropsType infers the type of props returned by the getStaticProps function
type Props = InferGetStaticPropsType<typeof getStaticProps>;

//{posts} comes from above 
const Blogs: NextPage<Props> = ({ posts }) => {
    return (
        <div className="max-w-3xl mx-auto p-5 space-y-5">
            {posts.map((post) => (
                <BlogCard
                    key={post.slug}
                    title={post.title}
                    desc={post.meta}
                    slug={post.slug}
                />
            ))}

        </div>
    )
}

export default Blogs;
