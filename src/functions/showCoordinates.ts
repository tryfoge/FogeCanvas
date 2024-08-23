import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { ForgeCanvas } from "..";
import { CanvasBuilder } from "../classes";
import { AttachmentBuilder } from "discord.js";

export default new NativeFunction({
    name: "$showCoordinates",
    version: "0.1.0",
    description: "Shows the full X and Y coordinates on the canvas using numbers.",
    alias: ["$show"],
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "canvas",
            description: "The name of the canvas where the coordinates will be shown.",
            rest: false,
            type: ArgType.String,
            required: true,
        },
    ],
    execute: async (ctx, [canvas]) => {
        const targetCanvas = ForgeCanvas.canvases[canvas];

        if (!targetCanvas || !(targetCanvas instanceof CanvasBuilder)) {
            return ctx.error("No canvas with the provided name.");
        }

        const canvasCtx = targetCanvas.getContext();
        const width = canvasCtx.canvas.width;
        const height = canvasCtx.canvas.height;

        // Draw the full coordinates on the canvas
        targetCanvas.fillText(`X: 0 - ${width}`, 10, height - 30, "16px Arial", 0xFFFFFF);
        targetCanvas.fillText(`Y: 0 - ${height}`, 10, height - 10, "16px Arial", 0xFFFFFF);

        // Render and create an attachment
        const buffer = targetCanvas.render();
        const attachment = new AttachmentBuilder(buffer, { name: `${canvas}.png` });

        return this.success(attachment);
    },
});
