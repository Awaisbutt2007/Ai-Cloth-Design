import { supabase } from './supabaseClient';

const bucketName = 'fashion-posts';

export async function uploadPost({ files, title, category, price, description, authorEmail, authorName, authorHandle }) {
  if (!files?.length) throw new Error('Please select at least one image.');
  const uploadedImages = [];

  for (const file of files) {
    const filePath = `${authorEmail || 'anonymous'}/${crypto.randomUUID()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    uploadedImages.push(data.publicUrl);
  }

  const { data: post, error: postError } = await supabase
    .from('posts')
    .insert({
      title: title || 'New Design',
      category: category || null,
      price: price ? Number(price) : 0,
      description: description || null,
      image_url: uploadedImages[0],
      images: uploadedImages,
      author_email: authorEmail || null,
      author_name: authorName || 'Anonymous',
      author_handle: authorHandle || '@user',
    })
    .select()
    .single();

  if (postError) throw postError;
  return post;
}

export async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  const mergedPosts = new Map();
  for (const post of data || []) {
    const mergeKey = [
      post.author_email || '',
      post.title || '',
      post.category || '',
      post.price || 0,
      post.description || '',
    ].join('|');
    const existing = mergedPosts.get(mergeKey);
    if (!existing) {
      mergedPosts.set(mergeKey, { ...post, images: Array.isArray(post.images) ? post.images : [post.image_url] });
      continue;
    }
    existing.images = [...existing.images, ...(Array.isArray(post.images) ? post.images : [post.image_url])]
      .filter((image, index, images) => image && !images.slice(0, index).includes(image));
  }

  return [...mergedPosts.values()].map((post) => ({
    ...post,
    url: post.image_url,
    images: post.images,
    date: post.created_at,
    isNew: true,
    views: post.views || 0,
    shares: post.shares || 0,
  }));
}
