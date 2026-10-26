import React from 'react'
import PostGrid from './PostsGrid'
import styles from './AllPosts.module.css'
import type { PostMeta } from '../../lib/posts-util'

interface AllPostsProps {
  posts: PostMeta[]
}

const AllPosts: React.FC<AllPostsProps> = ({ posts }) => {
  return (
    <section className={styles.posts}>
      <h1>All Posts</h1>
      <PostGrid posts={posts} />
    </section>
  )
}

export default AllPosts