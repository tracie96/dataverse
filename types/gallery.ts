export type GalleryItemType = "image" | "video";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  type?: GalleryItemType;
  videoUrl?: string;
  group?: string;
};

export type GalleryCategoryType = "album" | "video" | "story";

export type GalleryCategory = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  coverVideo?: string;
  externalUrl?: string;
  type: GalleryCategoryType;
  tag: string;
  items: GalleryItem[];
};
