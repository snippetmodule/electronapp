import {darken} from "./functions";
import * as _ from "lodash";
import {ColorCode} from "../../Interfaces";

export const colors = {
    black: "#292C33",
    red: "#BF6E7C",
    white: "#95A2BB",
    green: "#88B379",
    yellow: "#D9BD86",
    blue: "#66A5DF",
    magenta: "#C699C5",
    cyan: "#6EC6C6",

    brightBlack: "#484c54",
    brightRed: "#dd8494",
    brightWhite: "#adbcd7",
    brightGreen: "#9dcc8c",
    brightYellow: "#e9cc92",
    brightBlue: "#6cb2f0",
    brightMagenta: "#e8b6e7",
    brightCyan: "#7adada",
};

const colorIndex = [
    colors.black,
    colors.red,
    colors.green,
    colors.yellow,
    colors.blue,
    colors.magenta,
    colors.cyan,
    colors.white,

    colors.brightBlack,
    colors.brightRed,
    colors.brightGreen,
    colors.brightYellow,
    colors.brightBlue,
    colors.brightMagenta,
    colors.brightCyan,
    colors.brightWhite,

    ...generateIndexedColors(),
    ...generateGreyScaleColors(),
];

function toRgb(colorComponent: number) {
    if (colorComponent === 0) {
        return 0;
    }

    return 55 + colorComponent * 40;
}

function generateIndexedColors() {
    return _.range(0, 216).map(index => {
        const red = Math.floor(index / 36);
        const green = Math.floor((index % 36) / 6);
        const blue = Math.floor(index % 6);

        return `rgb(${toRgb(red)}, ${toRgb(green)}, ${toRgb(blue)})`;
    });
}

function generateGreyScaleColors() {
    return _.range(0, 24).map(index => {
        const color = index * 10 + 8;
        return `rgb(${color}, ${color}, ${color})`;
    });
}

export function colorValue(color: ColorCode, options = {isBright: false}) {
    if (Array.isArray(color)) {
        return `rgb(${color.join(", ")})`;
    } else {
        if (options.isBright && color < 8) {
            return colorIndex[color + 8];
        } else {
            return  colorIndex[color];
        }
    }
}

export const background = colors.black;
export const panel = darken(background, 3);
