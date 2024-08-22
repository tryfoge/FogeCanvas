import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeCanvas } from ".."
import { CanvasBuilder } from "../classes"

export default new NativeFunction({
    name: "$showCoordinates",
    version: "0.1.0",
    description: "Shows the X and Y coordinates on the canvas.",
    alias: [
          "$show"
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
    execute: async (ctx, [canvas]) => {
        if (!ForgeCanvas.canvases || !ForgeCanvas.canvases[canvas] || !(ForgeCanvas.canvases[canvas] instanceof CanvasBuilder))
        return this.customError("No canvas with provided name.");
        import { width, height } from ForgeCanvas.canvases[canvas];
        ForgeCanvas.canvases[canvas].fillText(`X: ${width}`, width - 50, height - 10, "16px Arial", 0xFFFFFF);
        ForgeCanvas.canvases[canvas].fillText(`Y: ${height}`, 10, height - 10, "16px Arial", 0xFFFFFF);
        return this.success()
    }
});
