import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import PostHeader from "./PostHeader";
import styles from "./PostContent.module.css";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';

// Register only the languages used in posts to keep the bundle small
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('json', json);


export const PostContent = ({
  title,
  slug,
  image,
  content,
}: {
  title: string;
  slug: string;
  image: string;
  content: string;
}) => {
    const imagePath = `/images/posts/${slug}/${image}`;

  const customComponents: Components = {
    p({ node, children }) {
      const firstChild = node?.children[0];

      if (firstChild?.type === "element" && firstChild.tagName === "img") {
        const { src, alt } = firstChild.properties;

        return (
          <div className={styles.image}>
            <Image
              src={`/images/posts/${slug}/${src}`}
              alt={String(alt ?? "")}
              width={600}
              height={338}
              // Inline images vary in shape, so keep each one's own proportions
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        );
      }

      return <p>{children}</p>;
    },
    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || "");

      if (!match) {
        return <code className={className}>{children}</code>;
      }

      return (
        <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div">
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    },
  };
  return (
    <article className={styles.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
    </article>
  );
};
