<template>
    <div :aria-label="label"
         :class="themeClasses"
         :style="themeStyles"
         :tabindex="focusIndex"
         @click="onClick"
         @focusin="focusIn"
         @focusout="focusOut"
         @keyup.enter="onEnter"
         class="switch"
         ref="switch">
        <div :class="{on:checked, off:!checked}" class="wrapper">
            <div class="rail"></div>
            <div class="thumb-box">
                <div class="left">
                    <slot name="true-icon">
                        <fa-icon :icon="trueIconValue" class="icon" v-if="trueIconValue !== ''"/>
                    </slot>
                </div>
                <div class="thumb"></div>
                <div class="right">
                    <slot name="false-icon">
                        <fa-icon :icon="falseIconValue" class="icon" v-if="falseIconValue !== ''"/>
                    </slot>
                </div>
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
        @Prop({default: ""}) readonly trueColor!: string;
        @Prop({default: ""}) readonly falseColor!: string;
        @Prop({default: ""}) readonly accentColor!: string;

        // Behaviour
        @Prop({default: -1}) readonly focusIndex!: number;
        @PropSync("focused", {default: false}) syncFocused!: boolean;
        @Prop({default: true}) readonly keyboardHandled!: boolean;
        @Prop({default: false}) disabled!: boolean;

        // Accessibility
        @Prop({default: ""}) label!: string;

        // INTERNAL DATA ------------------------------------------------------

        @Ref() readonly switch!: HTMLElement;

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
                    styles["--true-color"] = ColorUtils.wrapVariable("j-secondary");
                } else {
                    styles["--true-color"] = ColorUtils.wrapVariable("j-primary");
                }
            }

            if (this.falseColor !== "") {
                styles["--false-color"] = ColorUtils.themeColorToCss(this.falseColor);
            } else {
                if (this.negative) {
                    styles["--false-color"] = ColorUtils.wrapVariable("j-primary");
                } else {
                    styles["--false-color"] = ColorUtils.wrapVariable("j-secondary");
                }
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
                this.switch.focus();
            }
        }
    }
</script>

<style lang="scss" scoped>
    $size: 2em;
    $minSize: $size * 1.8em / 2.572em;
    $padding: ((2 * $size) - $size - $minSize) / 2;

    .switch {
        cursor: pointer;
        font-weight: bold;
        outline: none;
        overflow: hidden;
        padding: 2px;
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
            width: ($size + $minSize + $padding);

            .thumb-box {
                align-items: center;
                bottom: 0;
                display: flex;
                justify-content: space-between;
                position: absolute;
                top: 0;
                transition: right 0.4s ease-out;
                width: (2 * $size + $minSize);

                .left {
                    align-items: center;
                    color: var(--true-color);
                    display: flex;
                    justify-content: center;
                    width: ($size);
                }

                .thumb {
                    border-radius: 4px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                    height: $minSize;
                    transition: background-color 0.4s ease;
                    width: $minSize;
                }

                .right {
                    align-items: center;
                    color: var(--false-color);
                    display: flex;
                    justify-content: center;
                    width: ($size);
                }
            }

            .rail {
                border: 1px solid rgba(0, 0, 0, 0.12);
                border-radius: 4px;
                bottom: 0;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                transition: background-color 0.4s ease;
            }

            &.on {
                .rail {
                    background-color: var(--false-color);
                }

                .thumb-box {
                    right: (-$size + $padding);

                    .thumb {
                        background-color: var(--true-color);
                    }
                }
            }

            &.off {
                .rail {
                    background-color: var(--true-color);
                }

                .thumb-box {
                    right: 0;

                    .thumb {
                        background-color: var(--false-color);
                    }
                }
            }
        }

        &.rounded {
            border-radius: 200px !important;

            .wrapper {
                border-radius: 200px !important;
            }

            .thumb {
                border-radius: 200px !important;
            }

            .rail {
                border-radius: 200px !important;
            }
        }

        &.tricolor {
            .left {
                color: var(--accent-color) !important;
            }

            .thumb {
                background-color: var(--accent-color) !important;
            }

            .right {
                color: var(--accent-color) !important;
            }
        }

        &:hover, &:focus {
            .wrapper {
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            }
        }
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
