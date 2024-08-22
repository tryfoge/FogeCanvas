"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const AttachmentBuilder = require("discord.js");
const CanvasBuilder = require("../classes");
const forgescript_1 = require("@tryforge/forgescript");

exports.default = new forgescript_1.NativeFunction({
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
            description: "The name of canvas to draw X and Y on.",
            rest: false,
            type: forgescript_1.ArgType.String,
            required: true
        }
    ],
    execute(ctx, [canvas]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder)) {
            return ctx.error(`There's no such canvas named '${canvas}'`);
        }

        const canvasCtx = CanvasBuilder.ctx;
        const { width, height } = canvasCtx.canvas;

        // Draw X and Y coordinates on the canvas
        canvs.fillText(`X: ${width}`, width - 50, height - 10, "16px Arial", 0xFFFFFF);
        canvs.fillText(`Y: ${height}`, 10, height - 10, "16px Arial", 0xFFFFFF);

        // Render and create an attachment
        const buffer = canvs.render();
        const attachment = new AttachmentBuilder(buffer, { name: `${canvas}.png` });

        return ctx.success(attachment);
    }
});
