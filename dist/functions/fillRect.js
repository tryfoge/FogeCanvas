"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
const __1 = require("..");
const classes_1 = require("../classes");
exports.default = new forgescript_1.NativeFunction({
    name: "$fillRect",
    version: "1.0.0",
    description: "Draws rect in provided canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of canvas to draw text on.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "color",
            description: "The color of rect.",
            rest: false,
            type: forgescript_1.ArgType.Color,
            required: true
        },
        {
            name: "x",
            description: "The X position of rect.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "y",
            description: "The Y position of rect.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        },
        {
            name: "width",
            description: "The rect width.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        },
        {
            name: "height",
            description: "The rect height.",
            rest: false,
            type: forgescript_1.ArgType.Number,
            required: true
        }
    ],
    execute(_ctx, [canvas, color, x, y, width, height]) {
        if (!__1.ForgeCanvas.canvases || !__1.ForgeCanvas.canvases[canvas] || !(__1.ForgeCanvas.canvases[canvas] instanceof classes_1.CanvasBuilder))
            return this.customError("No canvas with provided name.");
        __1.ForgeCanvas.canvases[canvas].fillRect(color, x, y, width, height);
        return this.success();
    },
});
//# sourceMappingURL=fillRect.js.map