<template>
    <div :style="{width: blockWidth}" class="error-view-root" ref="root">
        <div class="status">Error {{code}}: {{$t(`title.${code}`)}}</div>
        <div class="message">{{$t(`message.${code}`)}}</div>
        <div class="back">
            <j-button :focus-index="0"
                      :focused="true"
                      :text="$t('button')"
                      @click="navigateBack"
                      left-icon="chevron-left"
                      theme="link"/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "~/node_modules/vue-property-decorator";
    import JButton from "~/components/ui/JButton.vue";
    import { NuxtTypes } from "~/types/NuxtTypes";

    @Component({
        components: {JButton}
    })
    export default class ErrorView extends Vue {
        @Prop({}) error?: NuxtTypes.RouterError;
        blockWidth: string = "auto";

        // GETTERS & SETTERS --------------------------------------------------

        get code() {
            if (this.error!!.statusCode === 404) {
                return 404;
            } else {
                return 500;
            }
        }

        // METHODS ------------------------------------------------------------

        navigateBack() {
            if (this.$route.path === "/") {
                this.$router.go(0);
                return;
            }

            this.$router.push("/");
        }

        // WATCHERS -----------------------------------------------------------

        // HOOKS --------------------------------------------------------------
    }
</script>

<style scoped>
    .error-view-root {
        background-color: var(--bg-color);
        --menu-bar-height: 24px;
        border-radius: 7px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, .1), 0 1px 8px rgba(0, 0, 0, .2);
        color: var(--text-color);
        max-width: 500px;
        min-width: var(--min-width);
        overflow: hidden;
        padding: 30px;
        transition: height, width, border-radius 0.3s ease;
        width: 100vw;
    }

    .status {
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 12px;
        text-align: center;
    }

    .message {
        margin-bottom: 12px;
        text-align: center;
        white-space: pre-wrap;
    }
</style>

<i18n>
    {
        "en": {
            "title": {
                "404": "Page Not Found",
                "500": "Internal Server Error"
            },
            "message": {
                "404": "Upss! Looks like you've followed a broken link.\nStop snooping!!",
                "500": "Upss! There was an error loading the page, please try again or make an issue on Github to inform about it."
            },
            "button": "Back to the website"
        },
        "es": {
            "title": {
                "404": "Page Not Found",
                "500": "Internal Server Error"
            },
            "message": {
                "404": "Upss! Parece que has seguido un enlace roto.\n¡¡Deja de fisgar!!",
                "500": "Upss! Ha habido un error cargando la página, por favor prueba de nuevo o crea un issue en Github para informar sobre ello."
            },
            "button": "Volver a la web"
        }
    }
</i18n>
