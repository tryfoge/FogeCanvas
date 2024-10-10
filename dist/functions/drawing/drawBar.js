"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$addProgressBar',
    description: 'Draws a customizable progress bar on a canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'x',
            description: 'X-coordinate where the progress bar starts.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'y',
            description: 'Y-coordinate where the progress bar starts.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'width',
            description: 'Width of the progress bar.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'height',
            description: 'Height of the progress bar.',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'progress',
            description: 'Progress value (from 0 to 1).',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'bgColor',
            description: 'Background color of the progress bar.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'fillColor',
            description: 'Fill color for the progress part.',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'borderRadius',
            description: 'Radius of the corners for the progress bar (optional).',
            type: forgescript_1.ArgType.Number,
            required: false,
            rest: false,
        },
    ],
    async execute(ctx, [name, x, y, width, height, progress, bgColor, fillColor, borderRadius]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.current?.[ctx.canvasManager?.current.length - 1];
        if (!canvas) {
            return this.customError('No canvas found.');
        }
        const ctx2d = canvas.ctx;
        // Draw background
        ctx2d.fillStyle = bgColor;
        if (borderRadius) {
            ctx2d.beginPath();
            ctx2d.moveTo(x + borderRadius, y);
            ctx2d.lineTo(x + width - borderRadius, y);
            ctx2d.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
            ctx2d.lineTo(x + width, y + height - borderRadius);
            ctx2d.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
            ctx2d.lineTo(x + borderRadius, y + height);
            ctx2d.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
            ctx2d.lineTo(x, y + borderRadius);
            ctx2d.quadraticCurveTo(x, y, x + borderRadius, y);
            ctx2d.closePath();
            ctx2d.fill();
        }
        else {
            ctx2d.fillRect(x, y, width, height);
        }
        // Draw progress
        ctx2d.fillStyle = fillColor;
        const progressWidth = Math.max(0, Math.min(width, progress * width)); // Ensures progress stays between 0 and width
        if (borderRadius) {
            ctx2d.beginPath();
            ctx2d.moveTo(x + borderRadius, y);
            ctx2d.lineTo(x + progressWidth - borderRadius, y);
            ctx2d.quadraticCurveTo(x + progressWidth, y, x + progressWidth, y + borderRadius);
            ctx2d.lineTo(x + progressWidth, y + height - borderRadius);
            ctx2d.quadraticCurveTo(x + progressWidth, y + height, x + progressWidth - borderRadius, y + height);
            ctx2d.lineTo(x + borderRadius, y + height);
            ctx2d.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
            ctx2d.lineTo(x, y + borderRadius);
            ctx2d.quadraticCurveTo(x, y, x + borderRadius, y);
            ctx2d.closePath();
            ctx2d.fill();
        }
        else {
            ctx2d.fillRect(x, y, progressWidth, height);
        }
        return this.success();
    },
});
//# sourceMappingURL=drawBar.js.map