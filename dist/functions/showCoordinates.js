"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { AttachmentBuilder } = require("discord.js");
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
        canvas = canvas?.trim();

        // Retrieve the canvas from the environment
        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder)) {
            return ctx.error(`There's no such canvas named '${canvas}'`);
        }

        // Get the canvas context and dimensions
        const canvasCtx = CanvasBuilder.ctx;
        const { width, height } = canvasCtx.canvas;

        // Draw X and Y coordinates on the canvas
        canvs.fillText(`X: ${width}`, width - 50, height - 10, "16px Arial", 0xFFFFFF);
        canvs.fillText(`Y: ${height}`, 10, height - 10, "16px Arial", 0xFFFFFF);

        // Render the canvas to a buffer
        const buffer = canvs.render();

        // Create an attachment with the rendered image
        const attachment = new AttachmentBuilder(buffer, { name: `${canvas}.png` });

        // Return the attachment as the result
        return ctx.success(attachment);
    }
});
