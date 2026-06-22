// Falls back to Cloudinary's public 'demo' cloud so sample images work without configuration
const DEFAULT_CLOUD = "demo";

export function getCloudinaryUrl(publicId: string, width = 800) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUD;
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},f_auto,q_auto/${publicId}`;
}
