/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_API_DOMAIN, 'via.placeholder.com', 'picsum.photos'],
  },
}

export default nextConfig
