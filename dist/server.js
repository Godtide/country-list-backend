"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const csurf_1 = __importDefault(require("csurf"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const countryRoutes_1 = __importDefault(require("./routes/countryRoutes"));
const db_1 = require("./utils/db");
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
// app.use(xss());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);
const csrfProtection = (0, csurf_1.default)({ cookie: true });
app.use(csrfProtection);
app.use('/api', countryRoutes_1.default);
app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN')
        return next(err);
    res.status(403).json({ message: 'Invalid CSRF token' });
});
// // Generate Swagger JSON
// const specs = swaggerJsdoc(swaggerOptions);
// // Serve Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Connect to DB and start server
(0, db_1.connectDB)();
exports.default = app;
