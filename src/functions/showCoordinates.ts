import { AttachmentBuilder } from "discord.js";
import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { CanvasBuilder } from "../classes";

export default new NativeFunction({
    name: "$showCoordinates",
    version: "0.1.0",
    description: "Shows the X and Y coordinates on the canvas.",
    alias: [
      "$show",
      ],
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
    execute(ctx, [canvas]) {
        canvas = canvas?.trim();

        const canvs = ctx.getEnvironmentKey(`canvas_${canvas}`);
        if (!canvs || !(canvs instanceof CanvasBuilder))
            return this.customError(`There's no such canvas named '${canvas}'`);

        const { width, height } = canvs.getContext().canvas;
        
        // Draw X and Y coordinates
        canvs.fillText(`X: ${width}`, width - 50, height - 10, "16px Arial", 0xFFFFFF);
        canvs.fillText(`Y: ${height}`, 10, height - 10, "16px Arial", 0xFFFFFF);

        return this.success();
    }
});
