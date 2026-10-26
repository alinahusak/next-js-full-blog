import React from 'react'
import Image from 'next/image'
import styles from './PostHeader.module.css'

const PostHeader = ({ title , image }: { title: string, image: string }) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={320} height={180} priority />
    </header>
  )
}

export default PostHeader