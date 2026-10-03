import React, { useEffect, useRef } from 'react';
import { fetchPosts, incrementPostView } from '../lib/posts';

export default function SharedPostPage({ post }) {
  const viewRecorded = useRef(false);

  useEffect(() => {
    if (viewRecorded.current) return;
    viewRecorded.current = true;

    const recordView = async () => {
      try {
        let postId = post.id;
        if (!postId && post.url) {
          const posts = await fetchPosts();
          postId = posts.find((item) => item.url === post.url)?.id;
        }
        if (postId) await incrementPostView(postId);
      } catch (error) {
        console.error('Shared post view could not be recorded:', error);
      }
    };

    recordView();
  }, [post]);

  return (
    <main className="shared-profile-page shared-post-page">
      <div className="shared-profile-brand">AI FASHION</div>
      <article className="shared-post-card">
        {post.url && <img className="shared-post-image" src={post.url} alt={post.title} />}
        <div className="shared-post-copy">
          <p className="shared-profile-handle">{post.authorName} · {post.authorHandle}</p>
          <h1>{post.title}</h1>
          {post.description && <p>{post.description}</p>}
        </div>
      </article>
    </main>
  );
}
