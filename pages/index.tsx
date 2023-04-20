import { InferGetStaticPropsType, NextPage } from "next";
import BlogCard from "@/components/BlogCard";
import { readPostsInfo } from "@/lib/helper";
import { PostApiResponse } from "@/utils/types";

//THIS IS THE SAME AS THE INDEX.TSX 
//THIS USED TO BE THE 'HOME' PAGE 
//but I want the article lists on the home page 
//so I just temporarily added this here

//basically localhost:3000/ and localhost:3000/blogs is the same thing

export const getStaticProps = async()=>{

const postInfo: PostApiResponse = readPostsInfo()

    return{
        props: {posts: postInfo},
    }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const Blogs: NextPage<Props> = ({posts})=>{
    return(
    <div className="max-w-3xl mx-auto p-5 space-y-5">
        {posts.map((post)=>(
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



