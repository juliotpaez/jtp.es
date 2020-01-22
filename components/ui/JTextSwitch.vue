<template>
    <div :aria-label="label"
         :class="themeClasses"
         :style="themeStyles"
         :tabindex="focusIndex"
         @click="onClick"
         @focusin="focusIn"
         @focusout="focusOut"
         @keyup.enter="onEnter"
         class="text-switch"
         ref="text-switch">
        <div :class="{on:checked, off:!checked}" class="wrapper">
            <div class="left">
                <span>{{falseText}}</span>
            </div>
            <div class="middle">
                <div class="middle-container">
                    <div key="true-icon">
                        <fa-icon :icon="trueIconValue" class="on-icon"/>
                    </div>
                    <div key="false-icon">
                        <fa-icon :icon="falseIconValue" class="off-icon"/>
                    </div>
                </div>
            </div>
            <div class="right">
                <span>{{trueText}}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import "reflect-metadata";
    import { Component, Emit, Model, Prop, PropSync, Ref, Vue } from "~/node_modules/vue-property-decorator";
    import ColorUtils from "~/utils/ColorUtils";

    @Component
    export default class JTextSwitch extends Vue {
        // MODEL --------------------------------------------------------------
        @Model("change") readonly checked!: boolean;

        // PROPERTIES ---------------------------------------------------------

        // Content
        @Prop({default: ""}) readonly trueIcon!: string;
        @Prop({required: true}) readonly trueText!: string;
        @Prop({default: ""}) readonly falseIcon!: string;
        @Prop({required: true}) readonly falseText!: string;

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

        // Accessibility
        @Prop({default: ""}) label!: string;

        // INTERNAL DATA ------------------------------------------------------

        @Ref() readonly switch!: HTMLElement;

        // GETTERS & SETTERS --------------------------------------------------

        get trueIconValue() {
            let value = this.trueIcon.split(/\s+/, 2);

            switch (value.length) {
                case 0:
                    return ["fas", "check"];
                case 1:
                    if (value[0] === "") {
                        return ["fas", "check"];
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
                    return ["fas", "times"];
                case 1:
                    if (value[0] === "") {
                        return ["fas", "times"];
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
    $size: 2.572em;
    $minSize: 2em;
    $padding: 0.4em;

    .text-switch {
        cursor: pointer;
        font-weight: bold;
        min-width: 3 * $size;
        outline: none;
        overflow: hidden;
        padding: 2px;
        user-select: none;
        width: fit-content;

        .wrapper {
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-radius: 4px;
            display: flex;
            flex-wrap: nowrap;
            height: $size;
            justify-content: space-between;
            overflow: hidden;
            padding-left: 0.8em;
            padding-right: 0.8em;
            text-align: center;
            transition: background-color 0.3s ease;
            width: fit-content;

            & > * {
                align-items: center;
                display: flex;
                height: 100%;
                justify-content: center;
                opacity: 1;
                transition: opacity 0.3s ease;
            }

            .middle {
                margin-left: 0.2em;
                margin-right: 0.2em;
                overflow: hidden;
                width: $minSize;

                .middle-container {
                    align-items: center;
                    bottom: 0;
                    display: flex;
                    justify-content: center;
                    position: absolute;
                    right: 0;
                    top: 0;
                    transition: right 0.4s ease-out;

                    & > div {
                        align-items: center;
                        display: flex;
                        height: $minSize;
                        justify-content: center;
                        width: $minSize;

                        & > * {
                            font-size: 1.7em;
                        }
                    }

                    .on-icon,
                    .off-icon {
                        transform: scale(1);
                        transition: transform 0.4s ease-out;
                    }
                }
            }

            &.on {
                background-color: var(--false-color);
                color: var(--true-color);

                .left {
                    opacity: 0.4;
                }

                .middle-container {
                    right: (-$minSize);

                    .off-icon {
                        transform: scale(0.2);
                    }
                }
            }

            &.off {
                background-color: var(--true-color);
                color: var(--false-color);

                .right {
                    opacity: 0.4;
                }

                .middle-container {
                    .on-icon {
                        transform: scale(0.2);
                    }
                }
            }
        }

        &.rounded {
            .wrapper {
                border-radius: 200px !important;
            }
        }

        &.tricolor {
            .wrapper {
                color: var(--accent-color) !important;
            }
        }

        &:hover, &:focus {
            .wrapper {
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            }
        }
    }
</style>
