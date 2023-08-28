const isDev = process.env.NODE_ENV

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        backend_url: (isDev === "development" ? "http://localhost:3001" : "https://code-runner-8czw.onrender.com/")
    }
}

module.exports = nextConfig