import React from 'react';

export default function SharedProfilePage({ profile }) {
  const initials = profile.name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AF';

  return (
    <main className="shared-profile-page">
      <div className="shared-profile-brand">AI FASHION</div>
      <div className="shared-profile-content">
        <section className="shared-profile-identity" aria-label="Shared profile">
          <div className="shared-profile-avatar">
            {profile.photo ? <img src={profile.photo} alt="" /> : initials}
          </div>
          <h1>{profile.name}</h1>
          <p className="shared-profile-handle">@{profile.handle}</p>
          {profile.bio && <p className="shared-profile-bio">{profile.bio}</p>}
        </section>
        {profile.posts.length > 0 && (
          <section className="shared-profile-posts" aria-label="Recent public styles">
            {profile.posts.map((post, index) => (
              <img key={`${post.url}-${index}`} src={post.url} alt={post.title || 'Fashion style'} loading="lazy" />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}