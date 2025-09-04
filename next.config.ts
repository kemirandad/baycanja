import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Se elimina la configuración de remotePatterns que podría estar interfiriendo
    // con la carga de imágenes locales en ciertos entornos de despliegue.
  },
};

export default nextConfig;
