import type {
	ExpressiveCodeConfig,
	HomePageConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "偏微分茶会",
	subtitle: "Kappa Tea!",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 65, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: true, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "/assets/desktop-banner/movie_ending.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "bottom", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "かきふらい・芳文社／桜高軽音部", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
		type: "sidebar",  // Can be "sidebar" or "legacy"; "legacy" as default if not assigned
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
		{
			src: "/favicon/teatime/teatime-light-192.png",
			theme: "light",
			sizes: "192x192",
		},
		{
			src: "/favicon/teatime/teatime-light-180.png",
			theme: "light",
			sizes: "180x180",
		},
		{
			src: "/favicon/teatime/teatime-light-128.png",
			theme: "light",
			sizes: "128x128",
		},
		{
			src: "/favicon/teatime/teatime-light-32.png",
			theme: "light",
			sizes: "32x32",
		},

		{
			src: "/favicon/teatime/teatime-dark-192.png",
			theme: "dark",
			sizes: "192x192",
		},
		{
			src: "/favicon/teatime/teatime-dark-180.png",
			theme: "dark",
			sizes: "180x180",
		},
		{
			src: "/favicon/teatime/teatime-dark-128.png",
			theme: "dark",
			sizes: "128x128",
		},
		{
			src: "/favicon/teatime/teatime-dark-32.png",
			theme: "dark",
			sizes: "32x32",
		},
	],
	fonts: {
		base: {
			fontFamily: "未来圆SC",
			src: [
				"/assets/fonts/WeiLaiYuan-SC/Thin/result.css",
				"/assets/fonts/WeiLaiYuan-SC/Ultralight/result.css",
				"/assets/fonts/WeiLaiYuan-SC/Light/result.css",
				"/assets/fonts/WeiLaiYuan-SC/Regular/result.css",
				"/assets/fonts/WeiLaiYuan-SC/Medium/result.css",
				"/assets/fonts/WeiLaiYuan-SC/Bold/result.css",
			],
		},
		/* mono: {
			fontFamily: "未来圆SC",
			src: [
				"/a.css",
				"/b.css",
			],
		}, */  // unsupported for now
	},
	customFooters: {
		enable: true,
		objects: []
	},
};

export const navBarConfig: NavBarConfig = {
	homeIcon: {
		icon: "/assets/home-icon/teatime-light.png",
		darkIcon: "/assets/home-icon/teatime-dark.png",
	},
	title: "偏微分茶会！",
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		/* {
			name: "GitHub",
			url: "https://github.com/saicaca/fuwari", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		}, */
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "/assets/avatar/mai.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "Starry Monlark",
	bio: "我的爱是订书机。",
	links: [
		{
			name: "Bilibli",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/358196405",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/StrMnL",
		},
		/* {
			name: "Gitee",
			icon: "mdi:git",
			url: "https://gitee.com/StrMnL",
		}, */
	],
};

export const licenseConfig: LicenseConfig = {
	enable: false,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

export const homePageConfig: HomePageConfig = {
	newPostCards: {
		enable: true,  // enable new style for post cards
	}
}