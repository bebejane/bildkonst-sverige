/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		includePaths: ["./components", "./pages"],
		prependData: `
    	@use "sass:math";
    	@import "./styles/mediaqueries"; 
    	@import "./styles/fonts";
  	`,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	devIndicators: {
		buildActivity: false,
	},
	logging: {
		fetches: {
			fullUrl: false,
		},
	},
	async redirects() {
		return [
			{
				source: "/press",
				destination: "/om-oss/press",
				permanent: true,
			},
			{
				source: "/om-oss",
				destination: "/om-oss/om-bildkonst-sverige",
				permanent: true,
			},
			{
				source: "/styrelsen",
				destination: "/om-oss/styrelse",
				permanent: true,
			},
			{
				source: "/kontakta-oss",
				destination: "/kontakt",
				permanent: true,
			},
			{
				source: "/medlemskap",
				destination: "/bli-medlem",
				permanent: true,
			},
			{
				source: "/stadgar",
				destination: "/om-oss/stadgar",
				permanent: true,
			},
		];
	},
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{ key: "Access-Control-Allow-Methods", value: "POST,OPTIONS" },
					{
						key: "Access-Control-Allow-Headers",
						value:
							"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
					},
				],
			},
			{
				source: "/api/backup",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
					{ key: "Access-Control-Allow-Methods", value: "POST,OPTIONS" },
					{
						key: "Access-Control-Allow-Headers",
						value:
							"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
					},
				],
			},
		];
	},
};

export default nextConfig;
