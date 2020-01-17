import { Configuration } from "@nuxt/types";
import { NuxtVueI18n } from "~/node_modules/nuxt-i18n/types/nuxt-i18n";
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
    css: ["static/css/global.css"],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],

    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ["@nuxt/typescript-build"],

    /*
     ** Nuxt.js modules
     */
    modules: [// Doc: https://axios.nuxtjs.org/usage
        "@nuxtjs/axios", "@nuxtjs/pwa", // Doc: https://github.com/nuxt-community/dotenv-module
        "@nuxtjs/dotenv", ["nuxt-i18n", {
            baseUrl: "https://jtp.es",
            locales: [{
                code: "en",
                iso: "en-US"
            }, {
                code: "es",
                iso: "es-ES"
            }],
            vueI18nLoader: true, // Allows i18n tags in vue files.
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
            }
        } as AllOptionsInterface]],

    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},

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
