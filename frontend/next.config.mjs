/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    // Desabilita otimização de imagens - permite qualquer URL
    unoptimized: true,
  },
}

export default nextConfig
