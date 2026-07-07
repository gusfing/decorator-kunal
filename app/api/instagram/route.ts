import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return NextResponse.json(
      { error: 'Instagram API keys not configured in .env' },
      { status: 404 }
    );
  }

  try {
    const profileRes = await fetch(
      `https://graph.facebook.com/v19.0/${userId}?fields=profile_picture_url,followers_count,follows_count,media_count,biography,username&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );
    const profileData = await profileRes.json();

    const mediaRes = await fetch(
      `https://graph.facebook.com/v19.0/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,like_count,comments_count&limit=5&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );
    const mediaData = await mediaRes.json();

    if (profileData.error || mediaData.error) {
      throw new Error(profileData.error?.message || mediaData.error?.message || 'Failed to fetch Instagram data');
    }

    const formattedProfile = {
      username: profileData.username || 'decorlab.in',
      followers: formatNumber(profileData.followers_count),
      following: formatNumber(profileData.follows_count),
      posts: formatNumber(profileData.media_count),
      bio: profileData.biography || '',
      profilePicUrl: profileData.profile_picture_url || '',
    };

    const formattedFeed = (mediaData.data || []).map((post: any) => ({
      img: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      caption: post.caption || '',
      likes: formatNumber(post.like_count || 0),
      comments: formatNumber(post.comments_count || 0),
      permalink: post.permalink || 'https://www.instagram.com/decorlab.in',
    }));

    return NextResponse.json({
      profile: formattedProfile,
      feed: formattedFeed,
    });
  } catch (error) {
    console.error('Error syncing Instagram:', error);
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
