import { AttachmentBuilder } from "discord.js";
import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { CanvasBuilder } from "../classes/builder";

export default new NativeFunction({
    name: "$showCoordinates",
    version: "0.1.0",
    description: "Shows the X and Y coordinates on the canvas.",
    alias: ["$show"],
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

        const canvs = ctx.getEnvironmentKey<CanvasBuilder>(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder)) {
            return ctx.error(`There's no such canvas named '${canvas}'`);
        }

        // Getting the canvas context from the CanvasBuilder instance
        const canvasCtx = canvs.getContext();
        if (!canvasCtx) {
            return ctx.error("Failed to get the canvas context.");
        }

        const { width, height } = canvasCtx.canvas;

        // Draw X and Y coordinates on the canvas
        canvs.fillText(`X: ${width}`, width - 50, height - 10, "16px Arial", 0xFFFFFF);
        canvs.fillText(`Y: ${height}`, 10, height - 10, "16px Arial", 0xFFFFFF);

        // Render the canvas to a buffer
        const buffer = await canvs.render();

        // Create an attachment with the rendered image
        const attachment = new AttachmentBuilder(buffer, { name: `${canvas}.png` });

        // Return the attachment as the result
        return ctx.success(attachment);
    }
});
