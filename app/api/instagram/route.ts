import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://feeds.behold.so/ie5QswUsfVx5X2vHH0py', {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch from Behold');
    }
    
    const data = await res.json();

    const formattedProfile = {
      username: data.username || 'decorlab.in',
      followers: formatNumber(data.followersCount),
      following: formatNumber(data.followsCount),
      posts: '1,000+', 
      bio: data.biography || '',
      profilePicUrl: data.profilePictureUrl || '',
    };

    const formattedFeed = (data.posts || []).map((post: any) => ({
      img: post.sizes?.large?.mediaUrl || post.thumbnailUrl || post.mediaUrl,
      mediaType: post.mediaType || 'IMAGE',
      videoUrl: post.mediaType === 'VIDEO' ? post.mediaUrl : null,
      children: post.children ? post.children.map((child: any) => ({
        img: child.sizes?.large?.mediaUrl || child.mediaUrl,
        mediaType: child.mediaType || 'IMAGE'
      })) : null,
      caption: post.prunedCaption || post.caption || '',
      likes: formatNumber(post.likeCount || 0),
      comments: formatNumber(post.commentsCount || 0),
      permalink: post.permalink || 'https://www.instagram.com/decorlab.in',
    }));

    return NextResponse.json({
      profile: formattedProfile,
      feed: formattedFeed,
    });
  } catch (error) {
    console.error('Error syncing Instagram via Behold:', error);
    return NextResponse.json(
      { error: 'Failed to sync Instagram data' },
      { status: 500 }
    );
  }
}

function formatNumber(num: number): string {
  if (!num) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 10000) return (num / 1000).toFixed(1) + 'k';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}
