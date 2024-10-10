import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { Context } from '../..';

export default new NativeFunction({
    name: '$addProgressBar',
    description: 'Draws a customizable progress bar on a canvas.',
    version: '1.0.0',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'canvas',
            description: 'Name of the canvas.',
            type: ArgType.String,
            required: false,
            rest: false,
        },
        {
            name: 'x',
            description: 'X-coordinate where the progress bar starts.',
            type: ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'y',
            description: 'Y-coordinate where the progress bar starts.',
            type: ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'width',
            description: 'Width of the progress bar.',
            type: ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'height',
            description: 'Height of the progress bar.',
            type: ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'progress',
            description: 'Progress value (from 0 to 1).',
            type: ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'bgColor',
            description: 'Background color of the progress bar.',
            type: ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'fillColor',
            description: 'Fill color for the progress part.',
            type: ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'borderRadius',
            description: 'Radius of the corners for the progress bar (optional).',
            type: ArgType.Number,
            required: false,
            rest: false,
        },
    ],
    async execute(ctx: Context, [name, x, y, width, height, progress, bgColor, fillColor, borderRadius]) {
        const canvas = name
            ? ctx.canvasManager?.get(name)
            : ctx.canvasManager?.current?.[ctx.canvasManager?.current.length - 1];

        if (!canvas) {
            return this.customError('No canvas found.');
        }

        const ctx2d = canvas.ctx;

        // Validate progress to stay between 0 and 1
        progress = Math.max(0, Math.min(progress, 1)); // Ensures progress is between 0 and 1

        // **DEBUG: Log colors to check if they are valid**
        console.log('Background color:', bgColor);
        console.log('Fill color:', fillColor);

        // **Draw background**
        ctx2d.fillStyle = bgColor || 'gray'; // Use default color if bgColor is invalid
        if (borderRadius) {
            // Draw rounded background
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
        } else {
            // Draw rectangular background
            ctx2d.fillRect(x, y, width, height);
        }

        // **Draw progress fill**
        const progressWidth = progress * width;
        ctx2d.fillStyle = fillColor || 'green'; // Use default color if fillColor is invalid
        if (borderRadius) {
            // Draw rounded progress
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
        } else {
            // Draw rectangular progress fill
            ctx2d.fillRect(x, y, progressWidth, height);
        }

        return this.success();
    },
});
