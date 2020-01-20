<template>
    <div class="window-bar-root">
        <div class="dots">
            <div class="dot error"></div>
            <div @click="minimize" class="dot warn"></div>
            <div @click="maximize" class="dot debug"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop } from "vue-property-decorator";

    @Component
    export default class WindowBar extends Vue {
        @Prop({default: false}) maximized!: boolean;
        @Prop({default: false}) minimized!: boolean;

        // GETTERS & SETTERS --------------------------------------------------

        // METHODS ------------------------------------------------------------

        maximize() {
            this.maximized = !this.maximized;
            this.minimized = false;
        }

        minimize() {
            this.maximized = false;
            this.minimized = !this.minimized;
        }

        // WATCHERS -----------------------------------------------------------

        // HOOKS --------------------------------------------------------------
    }
</script>

<style scoped>
    .window-bar-root .dots {
        align-items: center;
        display: flex;
        height: 100%;
    }

    .window-bar-root .dots .dot {
        background-color: #626265;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, .1), 0 1px 8px rgba(0, 0, 0, .2);
        cursor: pointer;
        height: 8px;
        margin-left: 10px;
        width: 8px;
    }

    .window-bar-root .dots .dot.error:hover {
        background-color: var(--error-bg-color);
    }

    .window-bar-root .dots .dot.warn:hover {
        background-color: var(--warn-bg-color);
    }

    .window-bar-root .dots .dot.debug:hover {
        background-color: var(--debug-bg-color);
    }
</style>
