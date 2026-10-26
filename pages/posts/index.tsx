import React from "react";
import Head from "next/head";
import type { GetStaticProps } from "next";
import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts, PostMeta } from "../../lib/posts-util";

interface AllPostsPageProps {
  allPosts: PostMeta[];
}

const AllPostsPage = ({ allPosts }: AllPostsPageProps) => {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>
      <AllPosts posts={allPosts} />
    </>
  );
};

export const getStaticProps: GetStaticProps<AllPostsPageProps> = async () => {
  const allPosts = getAllPosts();
  return {
    props: {
      allPosts,
    },
  };
};

export default AllPostsPage;
