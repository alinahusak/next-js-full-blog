import React from "react";
import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import { PostContent } from "../../components/posts/post-detail/PostContent";
import { getPostData, getPostFiles, Post } from "../../lib/posts-util";

interface PostDetailPageProps {
  post: Post;
}

interface PostDetailParams {
  slug: string;
  [key: string]: string;
}

const PostDetailPage = ({ post }: PostDetailPageProps) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent
        title={post.title}
        slug={post.slug}
        image={post.image}
        content={post.content}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<
  PostDetailPageProps,
  PostDetailParams
> = async (context) => {
  const { slug } = context.params!;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600, // Optional: Regenerate the page every 10 minutes
  };
};

export const getStaticPaths: GetStaticPaths<PostDetailParams> = () => {
  const postFilenames = getPostFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
};
export default PostDetailPage;
