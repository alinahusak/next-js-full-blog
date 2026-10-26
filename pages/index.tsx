import React from 'react'
import Head from 'next/head'
import type { GetStaticProps } from 'next'
import FeaturedPosts from '../components/home-page/FeaturedPosts';
import Hero from '../components/home-page/Hero';
import { getFeaturedPosts, PostMeta } from '../lib/posts-util';

interface HomePageProps {
    posts: PostMeta[]
}

const HomePage = ({ posts: featuredPosts }: HomePageProps) => {
    return (
        <>
        <Head>
        <title>Alina&apos;s Blog</title>
        <meta
          name='description'
          content='I post about programming and web development.'
        />
      </Head>
        <Hero />
        <FeaturedPosts posts={featuredPosts}/>
        </>

    )
}

export const getStaticProps: GetStaticProps<HomePageProps> = () => {
    const featuredPosts = getFeaturedPosts();
  return {
      props: {
        posts: featuredPosts,
      },
  };
};

export default HomePage
