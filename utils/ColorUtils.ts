function themeColorToCss(color: string) {
    if (color === "") {
        return null;
    }

    if (color.startsWith("j-")) {
        return wrapVariable(color);
    }

    return color;
}

function wrapVariable(variable: string) {
    return "var(--" + variable + "-color)";
}

const ColorUtils = {
    themeColorToCss,
    wrapVariable
};

export default ColorUtils;
