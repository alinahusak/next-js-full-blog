import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export const getPostData = (postIdentifier: string): Post => {
  const slug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    ...(data as Omit<PostMeta, "slug">),
    slug,
    content,
  };
};

export const getPostFiles = (): string[] => {
  return fs.readdirSync(postsDirectory);
};

// List pages only need metadata, so the markdown body is left out of their props
export const getAllPosts = (): PostMeta[] => {
  const posts = getPostFiles();
  return posts
    .map((fileName) => {
      const { content, ...meta } = getPostData(fileName);
      return meta;
    })
    .sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });
};

export const getFeaturedPosts = (): PostMeta[] => {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.isFeatured);
};
