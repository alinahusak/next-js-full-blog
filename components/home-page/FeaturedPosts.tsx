import React from 'react'
import PostGrid from '../posts/PostsGrid'
import styles from './FeaturedPosts.module.css'
import type { PostMeta } from '../../lib/posts-util'

interface FeaturedPostsProps {
  posts: PostMeta[]
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  return (
   <section className={styles.latest}>
      <h2>Featured Posts</h2>
     <PostGrid posts={posts}/>
   </section>
  )
}

export default FeaturedPosts
