"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const __1 = require("..");
const classes_1 = require("../classes");
const { NativeFunction, ArgType } = require("@tryforge/forgescript");

exports.default = new NativeFunction({
    name: "$showCoordinates",
    version: "0.1.0",
    description: "Shows X and Y of the canvas",
    alias: [
           "$show",
           ],
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of the canvas to draw X and Y on.",
            rest: false,
            type: ArgType.String,
            required: true
        }
    ],
    execute(ctx, [canvas]) {
        if (!__1.ForgeCanvas.canvases || !__1.ForgeCanvas.canvases[canvas] || !(__1.ForgeCanvas.canvases[canvas] instanceof classes_1.CanvasBuilder))
            return this.customError("No canvas with provided name.");
        const { width, height } = __1.ForgeCanvas.canvases[canvas];
        __1.ForgeCanvas.canvases[canvas].fillText(`X: ${width}`, width - 50, height - 10, "16px Arial", 0xFFFFFF);
        __1.ForgeCanvas.canvases[canvas].fillText(`Y: ${height}`, 10, height - 10, "16px Arial", 0xFFFFFF);
        return this.success();
    }
});
