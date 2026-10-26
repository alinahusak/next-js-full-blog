import React from 'react'
import PostItem from './PostItem'
import styles from './PostsGrid.module.css'
import type { PostMeta } from '../../lib/posts-util'

interface PostsGridProps {
  posts: PostMeta[]
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
  return (
    <ul className={styles.grid}>
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
    </ul>
  )
}

export default PostsGrid