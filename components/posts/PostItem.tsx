import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./PostItem.module.css";
import type { PostMeta } from "../../lib/posts-util";

export const PostItem = ({ post }: { post: PostMeta }) => {

  const { title, image, date, excerpt, slug } = post;

  const imagePath = `/images/posts/${slug}/${image}`;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  return (
    <li className={styles.post}>
      <Link href={`/posts/${slug}`}>
        <div className={styles.image}>
          <Image src={imagePath} alt={title} width={480} height={270} />
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
