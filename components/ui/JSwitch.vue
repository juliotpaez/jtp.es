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
            <div class="left">
                <fa-icon :icon="trueIconValue" v-if="!material && trueIconValue !== ''"/>
            </div>
            <div class="right">
                <fa-icon :icon="falseIconValue" v-if="!material && falseIconValue !== ''"/>
            </div>
            <div class="thumb"></div>
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

        // Style
        @Prop({default: false}) readonly rounded!: boolean;
        @Prop({default: false}) readonly insetThumb!: boolean;
        @Prop({default: false}) readonly material!: boolean;
        @Prop({default: false}) readonly tricolor!: boolean; // Enables accent color
        @Prop({default: ""}) readonly trueColor!: string;
        @Prop({default: ""}) readonly falseColor!: string;
        @Prop({default: ""}) readonly accentColor!: string;
        @Prop({default: ""}) readonly trueIcon!: string;
        @Prop({default: ""}) readonly falseIcon!: string;

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

            if (this.material) {
                classes.push("material");
            }

            if (!this.material && this.insetThumb) {
                classes.push("inset-thumb");
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
    .switch {
        cursor: pointer;
        font-weight: bold;
        min-height: 2.572em;
        min-width: calc(2.572em * 2);
        outline: none;
        user-select: none;
        width: fit-content;

        & > .wrapper {
            border-radius: 4px;
            display: flex;
            flex-wrap: nowrap;
            height: 100%;
            justify-content: space-between;
            line-height: calc(2.572em - 4px * 2);
            min-height: 2.572em;
            padding: 4px;
            text-align: center;
            width: 100%;

            & > .thumb {
                border-radius: 4px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                height: 2.572em;
                position: absolute;
                top: 0;
                transition: right 0.3s, background-color 0.3s;
                width: 2.572em;
            }

            & > .rail {
                border-radius: 4px;
                bottom: 0;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                transition: background-color 0.3s;
            }

            & > .left {
                color: var(--true-color);
                min-width: calc(2.572em - 8px);
            }

            & > .right {
                color: var(--false-color);
                min-width: calc(2.572em - 8px);
            }

            &.on {
                & > .rail {
                    background-color: var(--false-color);
                }

                & > .thumb {
                    animation: expand-to-right 0.4s;
                    background-color: var(--true-color);
                    right: 0;
                }
            }

            &.off {
                & > .rail {
                    background-color: var(--true-color);
                }

                & > .thumb {
                    animation: expand-to-left 0.4s;
                    background-color: var(--false-color);
                    left: 0;
                }
            }
        }

        &.rounded {
            border-radius: 200px;

            & > .wrapper {
                border-radius: 200px;
            }

            .thumb {
                border-radius: 200px;
            }

            .rail {
                border-radius: 200px;
            }
        }

        &.inset-thumb {
            min-width: calc(2.572em * 1.4);

            .left,
            .right {
                min-width: 1.8em;
            }

            .thumb {
                height: 1.8em;
                top: calc((2.572em - 1.8em) / 2);
                width: 1.8em;
            }

            & > .wrapper.on {
                .thumb {
                    animation: expand-to-right-inset 0.4s;
                    right: calc((2.572em - 1.8em) / 2);
                }
            }

            & > .wrapper.off {
                .thumb {
                    animation: expand-to-left-inset 0.4s;
                    left: calc((2.572em - 1.8em) / 2);
                }
            }
        }

        &.material {
            min-width: calc(2.572em * 1.4);

            .left,
            .right {
                min-width: unset;
            }

            .thumb {
                height: 1.8em;
                top: calc((2.572em - 1.8em) / 2);
                width: 1.8em;
            }

            .rail {
                bottom: calc(2.572em / 3);
                top: calc(2.572em / 3);
            }

            & > .wrapper.on {
                .thumb {
                    animation: expand-to-right-material 0.4s;
                }
            }

            & > .wrapper.off {
                .thumb {
                    animation: expand-to-left-material 0.4s;
                }
            }

            &:hover, &:focus {
                & > .wrapper {
                    box-shadow: none;
                }

                .rail {
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                }
            }
        }

        &.tricolor {
            .thumb {
                background-color: var(--accent-color) !important;
            }
        }

        &:hover, &:focus {
            & > .wrapper {
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            }
        }
    }

    @keyframes expand-to-right {
        0% {
            right: 2.572em;
        }
        50% {
            width: 2.7em;
        }
        100% {
            right: 0;
        }
    }

    @keyframes expand-to-left {
        0% {
            left: 2.572em;
        }
        50% {
            width: 2.7em;
        }
        100% {
            left: 0;
        }
    }

    @keyframes expand-to-right-inset {
        0% {
            right: calc(2.572em - (2.572em - 1.8em) / 2);
        }
        50% {
            width: 2.1em;
        }
        100% {
            right: calc((2.572em - 1.8em) / 2);
        }
    }

    @keyframes expand-to-left-inset {
        0% {
            left: calc(2.572em - (2.572em - 1.8em) / 2);
        }
        50% {
            width: 2.1em;
        }
        100% {
            left: calc((2.572em - 1.8em) / 2);
        }
    }

    @keyframes expand-to-right-material {
        0% {
            right: 2.572em;
        }
        50% {
            width: 2.1em;
        }
        100% {
            right: 0;
        }
    }

    @keyframes expand-to-left-material {
        0% {
            left: 2.572em;
        }
        50% {
            width: 2.1em;
        }
        100% {
            left: 0;
        }
    }
</style>
