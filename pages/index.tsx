import { InferGetStaticPropsType, NextPage } from "next";
import BlogCard from "@/components/BlogCard";
import { readPostsInfo } from "@/lib/helper";
import { PostApiResponse } from "@/utils/types";

//THIS IS THE SAME AS THE INDEX.TSX 
//THIS USED TO BE THE 'HOME' PAGE 
//but I want the article lists on the home page 
//so I just temporarily added this here

//basically localhost:3000/ and localhost:3000/blogs is the same thing

export const getStaticProps = async () => {

    const postInfo: PostApiResponse = readPostsInfo()

    return {
        props: { posts: postInfo },
    }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const Blogs: NextPage<Props> = ({ posts }) => {
    return (
        <div className="max-w-3xl mx-auto p-5 space-y-5">
            <h1 className="text-4xl text-center mb-2 font-semibold">DevBlogs</h1>
            <p className="text-center">By Emily Jarecki</p>
            <div className="flex justify-between mx-16">
                <a target="_blank" className="mb-8" href="https://github.com/EmilyJarecki">GitHub</a>
                <a target="_blank" href="https://www.linkedin.com/in/emilyjarecki22/">LinkedIn</a>
                <a target="_blank" href="https://emily-jarecki-portfolio.netlify.app">Portfolio</a>
            </div>
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



