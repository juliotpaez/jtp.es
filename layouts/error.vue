<template>
    <div class="error-view-root">
        <div class="status">Error {{code}}</div>
        <div class="message">{{$t(message)}}</div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "~/node_modules/vue-property-decorator";

    interface Error {
        statusCode: number,
        message: string
    }

    @Component
    export default class DefaultLayout extends Vue {
        @Prop({}) error?: Error;

        // GETTERS & SETTERS --------------------------------------------------

        get code() {
            if (this.error!!.statusCode === 404) {
                return 404;
            } else {
                return 500;
            }
        }

        get message() {
            return this.$t(this.code.toString());
        }

        // METHODS ------------------------------------------------------------

        // WATCHERS -----------------------------------------------------------

        // HOOKS --------------------------------------------------------------
    }
</script>

<style scoped>
    .error-view-root {
    }

    .status {
        font-weight: bold;
    }
</style>

<i18n>
    {
        "en": {
            "404": "Upss! The page you request does not exist",
            "500": "Upss! There is an error loading the page, please try again or make an issue in Github to inform about it"
        },
        "es": {
            "404": "Upss! La página que has solicitado no existe",
            "500": "Upss! Ha habido un error cargando la página, por favor prueba de nuevo o crea un issue en Github para informar sobre ello"
        }
    }
</i18n>
