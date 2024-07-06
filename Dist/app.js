"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const DatabaseConnection_1 = require("./Database/DatabaseConnection");
const model_1 = require("./Model/model");
const fastify = (0, fastify_1.default)({
    logger: true
});
process.on("uncaughtException", (err) => {
    process.exit(1);
});
//  get env file  absloute path
// let envfileabsPath = join(process.cwd(),"CRUD_OPREATION", "Src" ,"Config", ".env");
// if (process.env.PRODUCTION != true) {
//   dotenv.config({ path: envfileabsPath });
// C:\Users\amitk\Desktop\FuelBuddy Assignment\\Src\Config\.env
// C:\Users\amitk\Desktop\FuelBuddy Assignment\\Src\Config\.env
(0, DatabaseConnection_1.Connectdb)();
//  Get All user 
fastify.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllUser = yield model_1.userModel.find();
        if (findAllUser.length == 0) {
            reply.send({ User: "User document is Empty please Create User" });
        }
        reply.send({ User: findAllUser });
    }
    catch (error) {
        reply.send(error);
    }
}));
// Create User 
fastify.post('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserDocument = new model_1.userModel(request.body);
        yield UserDocument.save();
        reply.send({ success: true, message: "user create successfully" });
    }
    catch (error) {
        reply.send(error);
    }
}));
// Update User by Id
fastify.put('/:id', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const user = yield model_1.userModel.findById(id);
        if (!user) {
            reply.send({ success: false, message: "This user is not Exist" });
        }
        const userUpdate = yield model_1.userModel.findByIdAndUpdate(id, request.body, { returnDocument: 'after' });
        reply.send({ success: true, message: "Update usersuccessfully", UpdatedDocument: userUpdate });
    }
    catch (error) {
        reply.send(error);
    }
}));
// deleteUser
fastify.delete('/:id', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const user = yield model_1.userModel.findById(id);
        if (!user) {
            reply.send({ success: false, message: "This user is not Exist" });
        }
        yield model_1.userModel.findByIdAndDelete(id);
        reply.send({ success: true, message: "User Delete Successfully" });
    }
    catch (error) {
        reply.send(error);
    }
    reply.send("delete Request");
}));
const Port = process.env.PORT || 3000;
// Run the server!
fastify.listen(Port, (err, address) => {
    if (err) {
        process.exit(1);
    }
});
process.on("unhandledRejection", (err) => {
    fastify.close(() => {
        process.exit(1);
    });
});
