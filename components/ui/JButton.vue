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
            <fa-icon :class="{icon: iconMode}" :icon="leftIconValue" v-if="this.leftIcon !== ''"/>
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
        @Prop({default: null}) ripple!: boolean | null;

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

        get rippleValue() {
            if (this.ripple === null) {
                // Avoid in link.
                return this.theme !== "link";
            }

            return this.ripple;
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

            if (this.rippleValue) {
                classes.push("ripple");
            }

            return classes;
        }

        get themeStyles() {
            const styles: any = {};

            if (this.color !== "") {
                styles["color"] = ColorUtils.themeColorToCss(this.color);
            } else {
                if (this.negative) {
                    styles["color"] = ColorUtils.wrapVariable("j-primary");
                } else {
                    styles["color"] = ColorUtils.wrapVariable("j-secondary");
                }
            }

            // Prevent in flat and link mode.
            if (this.theme !== "flat" && this.theme !== "link") {
                if (this.bgColor !== "") {
                    styles["background-color"] = ColorUtils.themeColorToCss(this.bgColor);
                } else {
                    if (this.negative) {
                        styles["background-color"] = ColorUtils.wrapVariable("j-secondary");
                    } else {
                        styles["background-color"] = ColorUtils.wrapVariable("j-primary");
                    }
                }
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
        outline: none;
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

    .button.icon > .wrapper {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        text-align: center;
        top: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: unset;
    }

    .button.icon > .wrapper > .icon {
        font-size: 1.5em;
    }

    /* -------------- */
    /* Standard theme */
    /* -------------- */
    .button.standard:hover, .button.standard:focus {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }

    .button.standard:hover .wrapper, .button.standard:focus .wrapper {
        outline: none;
    }

    /* Ripple effect */

    .button.ripple {
        background-position: center;
        transition: background 0.8s;
    }

    .button.ripple:hover {
        background: radial-gradient(circle, transparent 1%, rgba(0, 0, 0, 0.1) 1%) center/15000%;
    }

    .button.ripple:active {
        background-size: 100%;
        transition: background 0s;
    }

    /* ---------- */
    /* Flat theme */
    /* ---------- */
    .button.flat:hover .wrapper, .button.flat:focus .wrapper {
        background-color: rgba(0, 0, 0, 0.1);
        outline: none;
    }

    /* ------------- */
    /* Outline theme */
    /* ------------- */
    .button.outline {
        border: 1px solid currentColor;
    }

    .button.outline > .wrapper {
        min-height: calc(2.572em - 2px);
    }

    .button.outline.negative {
        color: var(--j-secondary-color);
    }

    .button.outline:hover, .button.outline:focus {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
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
