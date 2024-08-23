"use strict";
const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { ForgeCanvas } = require("..");
const { CanvasBuilder } = require("./classes/builder");

module.exports = new NativeFunction({
    name: "$showCoordinates",
    version: "0.1.0",
    description: "Shows the full X and Y coordinates on the canvas using numbers.",
    alias: ["$show"],
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of the canvas to draw X and Y coordinates on.",
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

        const canvasCtx = targetCanvas.getContext();
        const { width, height } = canvasCtx.canvas;

        // Draw the full coordinates on the canvas
        const coordText = `X: 0 - ${width}, Y: 0 - ${height}`;
        targetCanvas.fillText(coordText, 10, height - 10, "16px Arial", 0xFFFFFF);

        return this.success();
    }
});
