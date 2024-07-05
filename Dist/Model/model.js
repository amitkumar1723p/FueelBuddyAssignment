"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, trim: true, required: true },
    age: { type: Number, trim: true, required: true },
    city: { type: String, trim: true, required: true }
});
exports.userModel = mongoose_1.default.model('userDetail', userSchema);
