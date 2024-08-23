"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { ForgeCanvas } = require("..");
const { CanvasBuilder } = require("../classes");
const { NativeFunction, ArgType } = require("@tryforge/forgescript");

exports.default = new NativeFunction({
    name: "$showCoordinates",
    version: "0.1.0",
    description: "Shows X and Y of the canvas",
    alias: ["$show"],
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
        const targetCanvas = ForgeCanvas.canvases[canvas];
        
        if (!targetCanvas || !(targetCanvas instanceof CanvasBuilder)) {
            return ctx.error("No canvas with the provided name.");
        }

        const { width, height } = targetCanvas;

        targetCanvas.fillText(`X: ${width}`, width - 50, height - 10, "16px Arial", 0xFFFFFF);
        targetCanvas.fillText(`Y: ${height}`, 10, height - 10, "16px Arial", 0xFFFFFF);

        targetCanvas.render();
        return this.success();
    }
});
