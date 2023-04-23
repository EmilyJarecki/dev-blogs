import { FC } from 'react';
import Link from 'next/link';

interface Props {
    title: string;
    desc: string;
    slug: string;
}

const BlogCard: FC<Props> = ({ title, desc, slug }): JSX.Element => {
    return (
        <Link href={'/blogs/' + slug}>
                <div className="bg-blue-100 p-2 rounded block mb-2">
                    <h1 className="text-gray-900 text-3xl font-semibold">{title}</h1>
                    <p className="text-gray-500">{desc}</p>
                </div>
        </Link>
    )
};

export default BlogCard;