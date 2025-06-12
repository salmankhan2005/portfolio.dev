const path = require('path')
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
    ],
    domains: [
      'cdn.jsdelivr.net',
      'upload.wikimedia.org',
      'avatars.githubusercontent.com',
      'www.netlify.com',
      'assets.vercel.com',
      'cdn-icons-png.flaticon.com'
    ],
  },
}

module.exports = nextConfig;