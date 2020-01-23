import { Configuration } from "@nuxt/types";
import { NuxtVueI18n } from "~/node_modules/nuxt-i18n/types/nuxt-i18n";
import { AxiosRequestConfig } from "axios";
import AllOptionsInterface = NuxtVueI18n.Options.AllOptionsInterface;

const config: Configuration = {
    mode: "universal",

    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || "",
        meta: [{charset: "utf-8"}, {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
        }, {
            hid: "description",
            name: "description",
            content: process.env.npm_package_description || ""
        }, {
            hid: "author",
            name: "author",
            content: "Julio Treviño Páez"
        }],
        link: [{
            rel: "icon",
            type: "image/x-icon",
            href: "/favicon.ico"
        }]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: {color: "#ffffff"},

    /*
     ** Global CSS
     */
    css: ["@fortawesome/fontawesome-svg-core/styles.css", "static/css/global.css", "static/css/themes.css"],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: ["~/plugins/fontawesome", {
        src: "~/plugins/clientDirectives",
        mode: "client"
    }],

    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ["@nuxt/typescript-build"],

    /*
     ** Nuxt.js modules
     */
    modules: ["@nuxtjs/axios", "@nuxtjs/proxy", "@nuxtjs/pwa", "@nuxtjs/dotenv",

        // "@nuxtjs/auth",
        // "@nuxtjs/google-analytics",
        // "@nuxtjs/markdownit",

        ["nuxt-i18n", {
            /*
             ** Nuxt-i18n module configuration
             ** See https://nuxt-community.github.io/nuxt-i18n/options-reference.html
             */
            baseUrl: "https://jtp.es",
            locales: [{
                code: "en",
                iso: "en-US"
            }, {
                code: "es",
                iso: "es-ES"
            }],
            vueI18nLoader: true, // Allows i18n tags in vue files.
            strategy: "no_prefix",
            defaultLocale: "en",
            vueI18n: {
                fallbackLocale: "en",
                messages: {
                    en: {
                        greeting: "Hello world!"
                    },
                    es: {
                        greeting: "¡Hola mundo!"
                    }
                }
            },
            detectBrowserLanguage: {
                useCookie: true,
                alwaysRedirect: true
            }
        } as AllOptionsInterface]],

    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {} as AxiosRequestConfig,

    /*
     ** Proxy module configuration.
     ** See https://github.com/nuxt-community/proxy-module#readme
     */
    proxy: {
        // '/api/v1': {
        //     target: 'http://localhost:4000',
        //     pathRewrite: {
        //         '^/api' : '/'
        //     }
        // },
        // '/api/gql/v1': {
        //     target: 'http://localhost:4000',
        //     pathRewrite: {
        //         '^/api' : '/'
        //     }
        // }
    },

    /*
     ** Auth module configuration
     ** See https://auth.nuxtjs.org/schemes/local.html#usage
     */
    auth: {
        // local: {
        //     endpoints: {
        //         login: {
        //             url: "/api/auth/login",
        //             method: "post",
        //             propertyName: "token"
        //         },
        //         logout: {
        //             url: "/api/auth/logout",
        //             method: "post"
        //         },
        //         user: {
        //             url: "/api/auth/user",
        //             method: "get",
        //             propertyName: "user"
        //         }
        //     }
        // }
    },

    /*
     ** Google Analytics module configuration
     ** See https://github.com/nuxt-community/analytics-module
     */
    googleAnalytics: {
        // id: "UA-12301-2"
    },

    /*
     ** Markdownit module configuration
     ** See https://github.com/nuxt-community/modules/tree/master/packages/markdownit
     */
    markdownit: {},

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
        }
    }
};

export default config;
