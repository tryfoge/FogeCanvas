const { AttachmentBuilder } = require("discord.js");
const { CanvasBuilder } = require("../classes/builder");
const { NativeFunction, ArgType } = require("@tryforge/forgescript");

module.exports = new NativeFunction({
    name: "$showCoordinates",
    version: "0.1.0",
    description: "Shows the X and Y coordinates on the canvas.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of the canvas where the coordinates will be shown.",
            rest: false,
            type: ArgType.String,
            required: true
        }
    ],
    execute: async (ctx, [canvas]) => {
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
