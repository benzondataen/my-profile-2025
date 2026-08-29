import { ContentItem, ContentType, GalleryItem } from '../types';

// Helper to truncate text and remove HTML tags for cleaner descriptions
const cleanAndTruncate = (text: string, maxLength: number): string => {
    const cleaned = text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
    if (cleaned.length <= maxLength) return cleaned;
    return `${cleaned.substring(0, maxLength).trim()}...`;
};

/**
 * Fetches the latest public repositories from a GitHub user.
 * @param username The GitHub username.
 * @returns A promise that resolves to an array of ContentItem.
 */
export const fetchGitHubProjects = async (username: string): Promise<ContentItem[]> => {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch GitHub projects');
    const data = await response.json();
    return data.map((repo: any): ContentItem => ({
        id: repo.id,
        type: ContentType.GitHub,
        title: repo.name.replace(/[-_]/g, ' '),
        description: repo.description || 'No description available.',
        link: repo.html_url,
        tags: repo.language ? [repo.language] : ['Code'],
    }));
};

/**
 * Fetches all blog posts from a Medium user using an RSS-to-JSON proxy.
 * @param username The Medium username (without the '@').
 * @returns A promise that resolves to an array of ContentItem.
 */
export const fetchMediumPosts = async (username: string): Promise<ContentItem[]> => {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`);
    if (!response.ok) throw new Error('Failed to fetch Medium posts');
    const data = await response.json();
    if (data.status !== 'ok') throw new Error(`rss2json API error: ${data.message}`);
    return data.items.map((post: any): ContentItem => ({
        id: post.guid,
        type: ContentType.Medium,
        title: post.title,
        description: cleanAndTruncate(post.content, 120),
        link: post.link,
        tags: post.categories?.slice(0, 3) || ['Blog'],
    }));
};

/**
 * Fetches the latest videos from a YouTube channel, including view counts.
 * Requires a YouTube Data API v3 key.
 *
 * Uses channels -> playlistItems -> videos instead of search.list: search.list costs
 * 100 quota units per call, while this whole chain costs about 3 - and search.list
 * doesn't return statistics (view count) anyway, so a second call would be needed regardless.
 * @param channelId The ID of the YouTube channel.
 * @param apiKey The YouTube Data API key.
 * @returns A promise that resolves to an array of ContentItem, newest first.
 */
export const fetchYouTubeVideos = async (channelId: string, apiKey?: string): Promise<ContentItem[]> => {
    if (!apiKey) {
        console.warn('YouTube API key is missing. Skipping fetch for YouTube videos.');
        return [];
    }

    const channelRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channelId}&part=contentDetails`);
    if (!channelRes.ok) {
        console.error('YouTube API Error (channels):', await channelRes.json());
        throw new Error('Failed to fetch YouTube channel');
    }
    const channelData = await channelRes.json();
    const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) return [];

    const playlistRes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${uploadsPlaylistId}&part=snippet&maxResults=50`);
    if (!playlistRes.ok) {
        console.error('YouTube API Error (playlistItems):', await playlistRes.json());
        throw new Error('Failed to fetch YouTube uploads');
    }
    const playlistData = await playlistRes.json();
    const videos = (playlistData.items || []).filter((item: any) => item.snippet?.resourceId?.videoId);
    if (videos.length === 0) return [];

    const videoIds = videos.map((item: any) => item.snippet.resourceId.videoId).join(',');
    const statsRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=statistics`);
    if (!statsRes.ok) {
        console.error('YouTube API Error (videos/statistics):', await statsRes.json());
        throw new Error('Failed to fetch YouTube video statistics');
    }
    const statsData = await statsRes.json();
    const viewCountByVideoId = new Map<string, number>(
        statsData.items.map((v: any) => [v.id, parseInt(v.statistics?.viewCount, 10) || 0])
    );

    return videos.map((item: any): ContentItem => {
        const videoId = item.snippet.resourceId.videoId;
        return {
            id: videoId,
            type: ContentType.YouTube,
            title: item.snippet.title,
            description: cleanAndTruncate(item.snippet.description, 120),
            link: `https://www.youtube.com/watch?v=${videoId}`,
            tags: ['Video'],
            viewCount: viewCountByVideoId.get(videoId),
        };
    });
};

const IMAGE_EXTENSIONS = /\.(jpe?g|png|gif|webp|avif)$/i;

/**
 * Lists images from a public GCS bucket via the JSON API, organized in <prefix>/<year>/<file> folders.
 * The bucket must allow allUsers to read AND list objects, and have CORS enabled for browser fetches.
 * @param bucket The GCS bucket name.
 * @param prefix Folder prefix to scope the listing to (e.g. 'portfolio/'), so unrelated objects in the bucket are ignored.
 * @returns A promise that resolves to an array of GalleryItem, newest year first.
 */
export const fetchGalleryImages = async (bucket: string, prefix: string = ''): Promise<GalleryItem[]> => {
    const response = await fetch(`https://storage.googleapis.com/storage/v1/b/${bucket}/o?maxResults=1000&prefix=${encodeURIComponent(prefix)}`);
    if (!response.ok) throw new Error('Failed to fetch gallery images from GCS bucket');
    const data = await response.json();
    const objects: any[] = data.items || [];
    return objects
        .filter(obj => IMAGE_EXTENSIONS.test(obj.name))
        .map((obj): GalleryItem => {
            const relativeName = obj.name.slice(prefix.length);
            const segments = relativeName.split('/');
            const filename = segments[segments.length - 1];
            const folderYear = segments.length > 1 ? parseInt(segments[0], 10) : NaN;
            const year = Number.isNaN(folderYear) ? new Date(obj.timeCreated).getFullYear() : folderYear;
            const alt = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
            return {
                id: obj.id,
                src: `https://storage.googleapis.com/${bucket}/${obj.name.split('/').map(encodeURIComponent).join('/')}`,
                alt,
                year,
            };
        })
        .sort((a, b) => b.year - a.year);
};