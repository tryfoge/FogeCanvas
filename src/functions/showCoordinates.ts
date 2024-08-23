import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { ForgeCanvas } from "..";
import { CanvasBuilder } from "../classes";

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
        // Retrieve the canvas by name
        const targetCanvas = ForgeCanvas.canvases[canvas];
        
        if (!targetCanvas || !(targetCanvas instanceof CanvasBuilder)) {
            return ctx.error("No canvas with the provided name.");
        }

        // Get the width and height of the canvas
        const width = targetCanvas.width();
        const height = targetCanvas.height();

        // Draw X and Y coordinates on the canvas
        targetCanvas.fillText(`X: ${width}`, width - 50, height - 10, "16px Arial", 0xFFFFFF);
        targetCanvas.fillText(`Y: ${height}`, 10, height - 10, "16px Arial", 0xFFFFFF);

        // Render the canvas and return success
        await targetCanvas.render();
        return ctx.success();
    }
});
