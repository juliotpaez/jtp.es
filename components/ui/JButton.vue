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
            <fa-icon :class="{icon: iconMode}" :icon="leftIconValue" v-if="this.leftIconValue !== ''"/>
            <span v-if="!iconMode">{{text}}</span>
            <fa-icon :icon="rightIconValue" v-if="!iconMode && this.rightIconValue !== ''"/>
        </div>
    </div>
</template>

<script lang="ts">
    import "reflect-metadata";
    import { Component, Emit, Prop, PropSync, Ref, Vue } from "~/node_modules/vue-property-decorator";
    import ColorUtils from "~/utils/ColorUtils";

    @Component
    export default class JButton extends Vue {
        // PROPERTIES ---------------------------------------------------------

        // Content
        @Prop({default: ""}) readonly text!: string;

        // Style
        @Prop({default: "standard"}) readonly theme!: "standard" | "flat" | "outline" | "link";
        @Prop({default: false}) readonly rounded!: boolean;
        @Prop({default: ""}) readonly color!: string;
        @Prop({default: ""}) readonly bgColor!: string;
        @Prop({default: false}) readonly negative!: boolean;
        @Prop({default: false}) readonly iconMode!: boolean;
        @Prop({default: ""}) readonly leftIcon!: string;
        @Prop({default: ""}) readonly rightIcon!: string;
        @Prop({default: null}) readonly ripple!: boolean | null;

        // Behaviour
        @Prop({default: -1}) readonly focusIndex!: number;
        @PropSync("focused", {default: false}) syncFocused!: boolean;
        @Prop({default: true}) readonly keyboardHandled!: boolean;

        // Accessibility
        @Prop({default: ""}) label!: string;

        // INTERNAL DATA ------------------------------------------------------

        @Ref() readonly button!: HTMLElement;

        // GETTERS & SETTERS --------------------------------------------------

        get leftIconValue() {
            let value = this.leftIcon.trim().split(/\s+/, 2);

            switch (value.length) {
                case 0:
                    return "";
                case 1:
                    if (value[0] === "") {
                        return "";
                    }

                    value.unshift("fas");
                    return value;
                default:
                    return value;
            }
        }

        get rightIconValue() {
            let value = this.rightIcon.trim().split(/\s+/, 2);

            switch (value.length) {
                case 0:
                    return "";
                case 1:
                    if (value[0] === "") {
                        return "";
                    }

                    value.unshift("fas");
                    return value;
                default:
                    return value;
            }
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

        @Emit() focusIn() {
            if (!this.focusable) {
                return;
            }

            this.syncFocused = true;
        }

        @Emit() focusOut() {
            if (!this.focusable) {
                return;
            }

            this.syncFocused = false;
        }

        // WATCHERS -----------------------------------------------------------

        // HOOKS --------------------------------------------------------------

        mounted() {
            if (this.focusable && this.syncFocused) {
                this.button.focus();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .button {
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        min-height: 2.572em;
        min-width: 2.572em;
        outline: none;
        overflow: hidden;
        user-select: none;
        width: fit-content;

        &.rounded {
            border-radius: 200px;
        }

        & > .wrapper {
            height: 100%;
            line-height: calc(2.572em - 8px);
            min-height: 2.572em;
            padding: 4px 16px;
            text-align: center;
            width: 100%;
        }

        &.icon > .wrapper {
            align-items: center;
            bottom: 0;
            display: flex;
            justify-content: center;
            left: 0;
            min-height: unset;
            padding: 0;
            position: absolute;
            right: 0;
            text-align: center;
            top: 0;

            & > .icon {
                font-size: 1.5em;
            }
        }
    }

    /* -------------- */
    /* Standard theme */
    /* -------------- */
    .button.standard {
        &:hover, &:focus {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }

        &:hover .wrapper, &:focus .wrapper {
            outline: none;
        }
    }

    /* ---------- */
    /* Flat theme */
    /* ---------- */
    .button.flat {
        &:hover .wrapper, &:focus .wrapper {
            background-color: rgba(0, 0, 0, 0.1);
            outline: none;
        }
    }

    /* ------------- */
    /* Outline theme */
    /* ------------- */
    .button.outline {
        border: 1px solid currentColor;

        & > .wrapper {
            min-height: calc(2.572em - 2px);
        }

        &:hover, &:focus {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }
    }

    /* ---------- */
    /* Link theme */
    /* ---------- */
    .button.link {
        line-height: unset;
        min-height: unset;
        min-width: unset;
        padding: unset;

        & > .wrapper {
            line-height: unset;
            min-height: unset;
            min-width: unset;
            padding: unset;
        }

        &:hover .wrapper, &:focus .wrapper {
            text-decoration: underline;
        }
    }

    /* ------------- */
    /* Ripple effect */
    /* ------------- */

    .button.ripple {
        background: radial-gradient(circle, transparent 1%, rgba(0, 0, 0, 0.1) 1%) center/15000%;
        background-position: center;
        transition: background 0.8s;

        &:active {
            background-size: 100%;
            transition: background 0s;
        }
    }
</style>
