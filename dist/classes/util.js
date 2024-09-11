"use strict";	"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {	var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };	    return (mod && mod.__esModule) ? mod : { "default": mod };
};	};
Object.defineProperty(exports, "__esModule", { value: true });	Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.CanvasUtil = exports.Colors = exports.hexRegex = exports.rgbaRegex = exports.fontRegex = void 0;	exports.Logger = exports.CanvasUtil = exports.Colors = exports.hexRegex = exports.rgbaRegex = exports.fontRegex = void 0;
const canvas_1 = require("@napi-rs/canvas");	const canvas_1 = require("@napi-rs/canvas");
const chalk_1 = __importDefault(require("chalk"));	const chalk_1 = require("chalk");
exports.fontRegex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\sa-z]+?)\s*$/i;	exports.fontRegex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\sa-z]+?)\s*$/i;
exports.rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(\s*,\s*(0|1|0?\.\d+))?\s*\)$/;	exports.rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(\s*,\s*(0|1|0?\.\d+))?\s*\)$/;
exports.hexRegex = /^#?([0-9A-Fa-f]{3,4}){1,2}$/;	exports.hexRegex = /^#?([0-9A-Fa-f]{3,4}){1,2}$/;
exports.Colors = {	exports.Colors = {
    White: '#ffffff',	    White: '#ffffff',
    Aqua: '#1abc9c',	    Aqua: '#1abc9c',
    Green: '#57f287',	    Green: '#57f287',
    Blue: '#3498db',	    Blue: '#3498db',
    Yellow: '#fee75c',	    Yellow: '#fee75c',
    Purple: '#9b59b6',	    Purple: '#9b59b6',
    LuminousVividPink: '#e91e63',	    LuminousVividPink: '#e91e63',
    Fuchsia: '#eb459e',	    Fuchsia: '#eb459e',
    Gold: '#f1c40f',	    Gold: '#f1c40f',
    Orange: '#e67e22',	    Orange: '#e67e22',
    Red: '#ed4245',	    Red: '#ed4245',
    RubberDuck: '#FFD700',	    RubberDuck: '#FFD700',
    Grey: '#95a5a6',	    Grey: '#95a5a6',
    Navy: '#34495e',	    Navy: '#34495e',
    DarkAqua: '#11806a',	    DarkAqua: '#11806a',
    DarkGreen: '#1f8b4c',	    DarkGreen: '#1f8b4c',
    DarkBlue: '#206694',	    DarkBlue: '#206694',
    DarkPurple: '#71368a',	    DarkPurple: '#71368a',
    DarkVividPink: '#ad1457',	    DarkVividPink: '#ad1457',
    DarkGold: '#c27c0e',	    DarkGold: '#c27c0e',
    DarkOrange: '#a84300',	    DarkOrange: '#a84300',
    DarkRed: '#992d22',	    DarkRed: '#992d22',
    DarkGrey: '#979c9f',	    DarkGrey: '#979c9f',
    DarkerGrey: '#7f8c8d',	    DarkerGrey: '#7f8c8d',
    LightGrey: '#bcc0c0',	    LightGrey: '#bcc0c0',
    DarkNavy: '#2c3e50',	    DarkNavy: '#2c3e50',
    Blurple: '#5865f2',	    Blurple: '#5865f2',
    Greyple: '#99aab5',	    Greyple: '#99aab5',
    DarkButNotBlack: '#2c2f33',	    DarkButNotBlack: '#2c2f33',
    NotQuiteBlack: '#23272a'	    NotQuiteBlack: '#23272a'
};	};
class CanvasUtil {	class CanvasUtil {
    static isValidFont = (font) => {	    static isValidFont = (font) => {
        if (!font)	        if (!font)
            return false;	            return false;
        if (exports.fontRegex.test(font)) {	        if (exports.fontRegex.test(font)) {
            const res = exports.fontRegex.exec(font);	            const res = exports.fontRegex.exec(font);
            if (res && res[0]) {	            if (res && res[0]) {
                const families = res[6].split(',').map(x => x?.trim());	                const families = res[6].split(',').map(x => x?.trim());
                if (families) {	                if (families) {
                    for (const family of families) {	                    for (const family of families) {
                        if (!canvas_1.GlobalFonts.has(family.replace(/['',]/g, '')))	                        if (!canvas_1.GlobalFonts.has(family.replace(/['',]/g, '')))
                            return false;	                            return false;
                    }	                    }
                    ;	                    ;
                }	                }
                ;	                ;
                return true;	                return true;
            }	            }
            ;	            ;
            return false;	            return false;
        }	        }
        ;	        ;
        return false;	        return false;
    };	    };
    static parseFilters = (filters) => {	    static parseFilters = (filters) => {
        const result = [];	        const result = [];
        const regex = /(\w+)\(([^)]+)\)/g;	        const regex = /(\w+)\(([^)]+)\)/g;
        let match;	        let match;
        while ((match = regex.exec(filters)) !== null) {	        while ((match = regex.exec(filters)) !== null) {
            const [raw, filter, value] = match;	            const [raw, filter, value] = match;
            result.push({ filter, value, raw });	            result.push({ filter, value, raw });
        }	        }
        return result;	        return result;
    };	    };
    static rgbaToHex = (r, g, b, a) => '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0') + (a && a !== undefined ? Math.round(a * 255).toString(16).padStart(2, '0') : '');	    static rgbaToHex = (r, g, b, a) => '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0') + (a && a !== undefined ? Math.round(a * 255).toString(16).padStart(2, '0') : '');
    static hexToRgba = (hex) => ({	    static hexToRgba = (hex) => ({
        red: parseInt(hex.slice(1, 3), 16),	        red: parseInt(hex.slice(1, 3), 16),
        green: parseInt(hex.slice(3, 5), 16),	        green: parseInt(hex.slice(3, 5), 16),
        blue: parseInt(hex.slice(5, 7), 16),	        blue: parseInt(hex.slice(5, 7), 16),
        alpha: hex.length === 9 ? parseInt(hex.slice(7, 9), 16) : undefined	        alpha: hex.length === 9 ? parseInt(hex.slice(7, 9), 16) : undefined
    });	    });
}	}
exports.CanvasUtil = CanvasUtil;	exports.CanvasUtil = CanvasUtil;
;	;
exports.Logger = {	exports.Logger = {
    DateColor: chalk_1.default.green.bold,	    DateColor: chalk_1.default.green.bold,
    Colors: {	    Colors: {
        INFO: chalk_1.default.cyan.bold,	        INFO: chalk_1.default.cyan.bold,
        WARN: chalk_1.default.yellow.bold,	        WARN: chalk_1.default.yellow.bold,
        ERROR: chalk_1.default.red.bold,	        ERROR: chalk_1.default.red.bold,
        MESSAGE: chalk_1.default.cyan.bold	        MESSAGE: chalk_1.default.cyan.bold
    },	    },
    log(type, message) {	    log(type, message) {
        console.log(this.DateColor(`[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}]`), this.Colors[type](`[${type}]`), this.Colors.MESSAGE(message));	        console.log(this.DateColor(`[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}]`), this.Colors[type](`[${type}]`), this.Colors.MESSAGE(message));
    }	    }
};	};
//# sourceMappingURL=util.js.map
