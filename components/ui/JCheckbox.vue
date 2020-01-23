<template>
    <div :aria-label="label"
         :class="themeClasses"
         :style="themeStyles"
         :tabindex="focusIndex"
         @click="onClick"
         @focusin="focusIn"
         @focusout="focusOut"
         @keyup.enter="onEnter"
         class="check-box"
         ref="checkBox">
        <div :class="{on:checked, off:!checked}" class="wrapper">
            <div class="rail"></div>
            <div class="thumb-box">
                <transition mode="out-in" name="zoom-in">
                    <div class="on-box" key="on" v-if="checked">
                        <fa-icon :icon="trueIconValue" v-if="trueIconValue !== ''"/>
                    </div>
                    <div class="off-box" key="off" v-else>
                        <fa-icon :icon="falseIconValue" v-if="falseIconValue !== ''"/>
                    </div>
                </transition>
            </div>
            <div class="disable-hover"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import "reflect-metadata";
    import { Component, Model, Prop, PropSync, Ref, Vue } from "~/node_modules/vue-property-decorator";
    import ColorUtils from "~/utils/ColorUtils";

    @Component
    export default class JSwitch extends Vue {
        // MODEL --------------------------------------------------------------
        @Model("change") readonly checked!: boolean;

        // PROPERTIES ---------------------------------------------------------

        // Content
        @Prop({default: ""}) readonly trueIcon!: string;
        @Prop({default: ""}) readonly falseIcon!: string;

        // Style
        @Prop({default: false}) readonly rounded!: boolean;
        @Prop({default: false}) readonly tricolor!: boolean; // Enables accent color
        @Prop({default: false}) readonly negative!: boolean;
        @Prop({default: false}) readonly bigFalse!: boolean;
        @Prop({default: false}) readonly iconic!: boolean;
        @Prop({default: ""}) readonly trueColor!: string;
        @Prop({default: ""}) readonly falseColor!: string;
        @Prop({default: ""}) readonly railColor!: string;
        @Prop({default: ""}) readonly accentColor!: string;

        // Behaviour
        @Prop({default: -1}) readonly focusIndex!: number;
        @PropSync("focused", {default: false}) syncFocused!: boolean;
        @Prop({default: true}) readonly keyboardHandled!: boolean;
        @Prop({default: false}) disabled!: boolean;

        // Accessibility
        @Prop({default: ""}) label!: string;

        // INTERNAL DATA ------------------------------------------------------

        @Ref() readonly checkBox!: HTMLElement;

        // GETTERS & SETTERS --------------------------------------------------

        get trueIconValue() {
            let value = this.trueIcon.split(/\s+/, 2);

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

        get falseIconValue() {
            let value = this.falseIcon.trim().split(/\s+/, 2);

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

        get themeClasses() {
            const classes = [];

            if (this.rounded) {
                classes.push("rounded");
            }

            if (this.bigFalse) {
                classes.push("big-off");
            }

            if (this.iconic) {
                classes.push("iconic");
            }

            if (this.tricolor) {
                classes.push("tricolor");
            }

            if (this.disabled) {
                classes.push("disabled");
            }

            return classes;
        }

        get themeStyles() {
            const styles: any = {};

            if (this.trueColor !== "") {
                styles["--true-color"] = ColorUtils.themeColorToCss(this.trueColor);
            } else {
                if (this.negative) {
                    styles["--true-color"] = ColorUtils.wrapVariable("j-primary");
                } else {
                    if (this.iconic) {
                        styles["--true-color"] = ColorUtils.wrapVariable("j-complementary");
                    } else {
                        styles["--true-color"] = ColorUtils.wrapVariable("j-secondary");
                    }
                }
            }

            if (this.falseColor !== "") {
                styles["--false-color"] = ColorUtils.themeColorToCss(this.falseColor);
            } else {
                if (this.negative) {
                    if (this.iconic) {
                        styles["--false-color"] = ColorUtils.wrapVariable("j-complementary");
                    } else {
                        styles["--false-color"] = ColorUtils.wrapVariable("j-secondary");
                    }
                } else {
                    styles["--false-color"] = ColorUtils.wrapVariable("j-primary");
                }
            }

            if (this.railColor !== "") {
                styles["--rail-color"] = ColorUtils.themeColorToCss(this.railColor);
            } else {
                styles["--rail-color"] = ColorUtils.themeColorToCss("rgba(0, 0, 0, 0.2)");
            }

            if (this.tricolor) {
                if (this.accentColor !== "") {
                    styles["--accent-color"] = ColorUtils.themeColorToCss(this.accentColor);
                } else {
                    styles["--accent-color"] = ColorUtils.wrapVariable("j-auxiliar");
                }
            }

            return styles;
        }

        get focusable() {
            return this.focusIndex >= 0;
        }

        // METHODS ------------------------------------------------------------

        onClick() {
            this.onEnter();
            window.document.documentElement.focus();
        }

        onEnter() {
            if (!this.disabled) {
                this.$emit("change", !this.checked);
            }
        }

        focusIn() {
            if (!this.focusable) {
                return;
            }

            this.syncFocused = true;
            this.$emit("focusIn");
        }

        focusOut() {
            if (!this.focusable) {
                return;
            }

            this.syncFocused = false;
            this.$emit("focusOut");
        }

        // WATCHERS -----------------------------------------------------------

        // HOOKS --------------------------------------------------------------

        mounted() {
            if (this.focusable && this.syncFocused) {
                this.checkBox.focus();
            }
        }
    }
</script>

<style lang="scss" scoped>
    $size: 2em;
    $falseSize: $size * 1.8em / 2.572em;

    .check-box {
        cursor: pointer;
        font-weight: bold;
        outline: none;
        overflow: hidden;
        padding: $size * 0.2em / 2.572em;
        user-select: none;
        width: fit-content;

        .wrapper {
            border-radius: 4px;
            display: flex;
            flex-wrap: nowrap;
            height: $size;
            justify-content: space-between;
            overflow: hidden;
            text-align: center;
            width: $size;

            .thumb-box {
                align-items: center;
                display: flex;
                height: 100%;
                justify-content: center;
                width: 100%;
            }

            .rail {
                background-color: var(--rail-color);
                border: 1px solid rgba(0, 0, 0, 0.12);
                border-radius: 4px;
                bottom: 0;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
            }

            .on-box {
                align-items: center;
                background-color: var(--true-color);
                border-radius: 4px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                color: var(--false-color);
                display: flex;
                height: calc(#{$size} - 2px);
                justify-content: center;
                width: calc(#{$size} - 2px);

                & > * {
                    font-size: $size * 1.5em / 2.572em;
                }
            }

            .off-box {
                align-items: center;
                background-color: var(--false-color);
                border-radius: 4px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                color: var(--true-color);
                display: flex;
                height: $falseSize;
                justify-content: center;
                width: $falseSize;
            }
        }

        &.big-off {
            .off-box {
                height: $size;
                width: $size;
            }
        }

        &.iconic {
            .on-box,
            .off-box {
                background-color: transparent !important;
                box-shadow: none !important;
                height: $size !important;
                width: $size !important;

                & > * {
                    font-size: $size * 1.5em / 2.572em !important;
                }
            }
        }

        &.rounded {
            .wrapper {
                border-radius: 200px !important;
            }

            .on-box {
                border-radius: 200px !important;
            }

            .off-box {
                border-radius: 200px !important;
            }
        }

        &.tricolor {
            .on-box,
            .off-box {
                color: var(--accent-color) !important;
            }
        }

        &:hover, &:focus {
            .wrapper {
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            }
        }
    }

    .zoom-in-enter-active,
    .zoom-in-leave-active {
        transition: transform 0.3s ease;
    }

    .zoom-in-enter-to,
    .zoom-in-leave {
        transform: scale(1);
    }

    .zoom-in-enter,
    .zoom-in-leave-to {
        transform: scale(0);
    }

    /* --------------- */
    /* Disabled effect */
    /* --------------- */
    .disable-hover {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
    }

    .disabled .disable-hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
