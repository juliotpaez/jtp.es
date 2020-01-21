const ColorUtils = {
    themeColorToCss(color: string) {
        if (color === "") {
            return null;
        }

        if (color.startsWith("j-")) {
            return "var(--" + color + "-color)";
        }

        return color;
    }
};

export default ColorUtils;
