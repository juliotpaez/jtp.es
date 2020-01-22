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
                    <fa-icon :icon="trueIconValue" class="icon" v-if="trueIconValue !== ''"/>
                    <span v-else-if="trueTextValue !== ''">{{trueTextValue}}</span>
                </div>
                <div class="thumb"></div>
                <div class="right">
                    <fa-icon :icon="falseIconValue" class="icon" v-if="falseIconValue !== ''"/>
                    <span v-else-if="falseTextValue !== ''">{{falseTextValue}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import "reflect-metadata";
    import { Component, Emit, Model, Prop, PropSync, Ref, Vue } from "~/node_modules/vue-property-decorator";
    import ColorUtils from "~/utils/ColorUtils";

    @Component
    export default class JSwitch extends Vue {
        // MODEL --------------------------------------------------------------
        @Model("change") readonly checked!: boolean;

        // PROPERTIES ---------------------------------------------------------

        // Content
        @Prop({default: ""}) readonly trueIcon!: string;
        @Prop({default: ""}) readonly trueText!: string;
        @Prop({default: ""}) readonly falseIcon!: string;
        @Prop({default: ""}) readonly falseText!: string;

        // Style
        @Prop({default: false}) readonly rounded!: boolean;
        @Prop({default: false}) readonly tricolor!: boolean; // Enables accent color
        @Prop({default: ""}) readonly trueColor!: string;
        @Prop({default: ""}) readonly falseColor!: string;
        @Prop({default: ""}) readonly accentColor!: string;

        // Behaviour
        @Prop({default: -1}) readonly focusIndex!: number;
        @PropSync("focused", {default: false}) syncFocused!: boolean;
        @Prop({default: true}) readonly keyboardHandled!: boolean;

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

        get trueTextValue() {
            return this.trueText.substr(0, 3);
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

        get falseTextValue() {
            return this.falseText.substr(0, 3);
        }

        get themeClasses() {
            const classes = [];

            if (this.rounded) {
                classes.push("rounded");
            }

            if (this.tricolor) {
                classes.push("tricolor");
            }

            return classes;
        }

        get themeStyles() {
            const styles: any = {};

            if (this.trueColor !== "") {
                styles["--true-color"] = ColorUtils.themeColorToCss(this.trueColor);
            } else {
                styles["--true-color"] = ColorUtils.wrapVariable("j-primary");
            }

            if (this.falseColor !== "") {
                styles["--false-color"] = ColorUtils.themeColorToCss(this.falseColor);
            } else {
                styles["--false-color"] = ColorUtils.wrapVariable("j-secondary");
            }

            if (this.tricolor) {
                if (this.accentColor !== "") {
                    styles["--accent-color"] = ColorUtils.themeColorToCss(this.accentColor);
                } else {
                    styles["--accent-color"] = ColorUtils.themeColorToCss("#ffffff");
                }
            }

            return styles;
        }

        get focusable() {
            return this.focusIndex >= 0;
        }

        // METHODS ------------------------------------------------------------

        onClick() {
            this.$emit("change", !this.checked);
            window.document.documentElement.focus();
        }

        onEnter() {
            this.$emit("change", !this.checked);
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
                this.switch.focus();
            }
        }
    }
</script>

<style lang="scss" scoped>
    $widthSide: 2.572em;
    $widthSideMin: $widthSide * 1.8em / 2.572em;
    $padding: ((2 * $widthSide) - $widthSide - $widthSideMin) / 2;

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
            height: $widthSide;
            justify-content: space-between;
            overflow: hidden;
            text-align: center;
            width: ($widthSide + $widthSideMin + $padding);

            .thumb-box {
                align-items: center;
                bottom: 0;
                display: flex;
                justify-content: space-between;
                position: absolute;
                top: 0;
                transition: right 0.3s ease-out;
                width: (2 * $widthSide + $widthSideMin);

                .left {
                    color: var(--true-color);
                    width: ($widthSide);
                }

                .thumb {
                    border-radius: 4px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                    height: $widthSideMin;
                    transition: background-color 0.3s ease;
                    width: $widthSideMin;
                }

                .right {
                    color: var(--false-color);
                    width: ($widthSide);
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
                transition: background-color 0.3s ease;
            }

            &.on {
                .rail {
                    background-color: var(--false-color);
                }

                .thumb-box {
                    right: (-$widthSide + $padding);

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
            .thumb {
                background-color: var(--accent-color) !important;
            }
        }

        &:hover, &:focus {
            .wrapper {
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            }
        }
    }
</style>
