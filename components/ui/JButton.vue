<template>
    <div :aria-label="label"
         :class="themeClasses"
         :style="themeStyles"
         :tabindex="focusIndex"
         @click="onClick"
         @focusin="focusIn"
         @focusout="focusOut"
         @keyup.enter="onEnter"
         class="button"
         ref="button">
        <div class="wrapper">
            <fa-icon :icon="leftIconValue" v-if="this.leftIcon !== ''"/>
            <span v-if="!iconMode">{{text}}</span>
            <fa-icon :icon="rightIconValue" v-if="!iconMode && this.rightIcon !== ''"/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "~/node_modules/vue-property-decorator";
    import ColorUtils from "~/utils/ColorUtils";

    @Component
    export default class JButton extends Vue {
        // Content
        @Prop({default: ""}) text!: string;

        // Style
        @Prop({default: "standard"}) theme!: "standard" | "flat" | "outline" | "link";
        @Prop({default: false}) rounded!: boolean;
        @Prop({default: ""}) color!: string;
        @Prop({default: ""}) bgColor!: string;
        @Prop({default: false}) negative!: boolean;
        @Prop({default: false}) iconMode!: boolean;
        @Prop({default: ""}) leftIcon!: string;
        @Prop({default: ""}) rightIcon!: string;

        // Behaviour
        @Prop({default: -1}) focusIndex!: number;
        @Prop({default: false}) focused!: boolean;
        @Prop({default: true}) keyboardHandled!: boolean;

        // Accessibility
        @Prop({default: ""}) label!: string;

        // GETTERS & SETTERS --------------------------------------------------

        get leftIconValue() {
            return this.leftIcon.split(/\s+/, 2) || "";
        }

        get rightIconValue() {
            return this.rightIcon.split(/\s+/, 2) || "";
        }

        get themeClasses() {
            const classes = [];
            switch (this.theme) {
                case "flat":
                case "standard":
                case "outline":
                case "link":
                    classes.push(this.theme);
                    break;
                default:
                    classes.push("standard");
                    break;
            }

            if (this.rounded) {
                classes.push("rounded");
            }

            if (this.negative) {
                classes.push("negative");
            }

            if (this.iconMode) {
                classes.push("icon");
            }

            return classes;
        }

        get themeStyles() {
            const styles: any = {};

            if (this.color !== "") {
                styles["color"] = ColorUtils.themeColorToCss(this.color);
            }

            // Prevent in flat and link mode.
            if (this.theme !== "flat" && this.theme !== "link" && this.bgColor !== "") {
                styles["background-color"] = ColorUtils.themeColorToCss(this.bgColor);
            }

            return styles;
        }

        get focusable() {
            return this.focusIndex >= 0;
        }

        // METHODS ------------------------------------------------------------

        onClick(ev: any) {
            this.$emit("click", ev);
            window.document.documentElement.focus();
        }

        onEnter(ev: any) {
            this.$emit("click", ev);
        }

        focusIn() {
            if (!this.focusable) {
                return;
            }

            this.$emit("update:focused", true);
            this.$emit("focusIn");
        }

        focusOut() {
            if (!this.focusable) {
                return;
            }

            this.$emit("update:focused", false);
            this.$emit("focusOut");
        }

        // WATCHERS -----------------------------------------------------------

        // HOOKS --------------------------------------------------------------

        mounted() {
            if (this.focusable && this.focused) {
                (this.$refs.button as HTMLElement).focus();
            }
        }
    }
</script>

<style scoped>
    .button {
        cursor: pointer;
        font-weight: bold;
        min-height: 2.572em;
        min-width: 2.572em;
        overflow: hidden;
        width: fit-content;
    }

    .button > .wrapper {
        height: 100%;
        line-height: calc(2.572em - 8px);
        min-height: 2.572em;
        padding: 4px 16px;
        text-align: center;
        width: 100%;
    }

    .button.rounded {
        border-radius: 200px;
    }

    .button.icon .wrapper {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        text-align: center;
        top: 0;
        padding: 0;
        font-size: 1.5em;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1em;
        min-height: unset;
    }

    /* -------------- */
    /* Standard theme */
    /* -------------- */
    .button.standard {
        background-color: var(--j-primary-color);
        color: var(--j-secondary-color);
        outline: none;
    }

    .button.standard.negative {
        background-color: var(--j-secondary-color);
        color: var(--j-primary-color);
    }

    .button.standard:hover .wrapper, .button.standard:focus .wrapper {
        background-color: rgba(0, 0, 0, 0.1);
        outline: none;
    }

    /* ---------- */
    /* Flat theme */
    /* ---------- */
    .button.flat {
        color: var(--j-primary-color);
        outline: none;
    }

    .button.flat.negative {
        color: var(--j-secondary-color);
    }

    .button.flat:hover .wrapper, .button.flat:focus .wrapper {
        background-color: rgba(0, 0, 0, 0.1);
        outline: none;
    }

    /* ------------- */
    /* Outline theme */
    /* ------------- */
    .button.outline {
        border: 1px solid currentColor;
        color: var(--j-primary-color);
        outline: none;
    }

    .button.outline.negative {
        color: var(--j-secondary-color);
    }

    .button.outline:hover .wrapper, .button.outline:focus .wrapper {
        background-color: rgba(0, 0, 0, 0.1);
        outline: none;
    }

    /* ---------- */
    /* Link theme */
    /* ---------- */
    .button.link,
    .button.link > .wrapper {
        color: var(--j-primary-color);
        line-height: unset;
        min-height: unset;
        min-width: unset;
        padding: unset;
    }

    .button.link.negative {
        color: var(--j-secondary-color);
    }

    .button.link:hover .wrapper, .button.link:focus .wrapper {
        text-decoration: underline;
    }
</style>
