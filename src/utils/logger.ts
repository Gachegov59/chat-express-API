import winston from 'winston';
const { combine, timestamp, label, printf, errors } = winston.format;
const customFormat = printf(({ level, message, label, timestamp, stack }) => {
	return `${timestamp} [${label}] ${level}: ${stack || message}`;
});

//todo: refactor - param: service
const logger = winston.createLogger({
	level: 'info',
	// format: winston.format.json(),
	format: combine(
		label({ label: 'user-service' }),
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		errors({ stack: true }), // Capture error stack traces
		customFormat
	),
	defaultMeta: { service: 'user-service' },
	transports: [
		// new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
		// new winston.transports.File({ filename: 'logs/combined.log' }),

		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: 'logs/combined.log' }),
		new winston.transports.Console({
			format: combine(winston.format.colorize(), winston.format.simple()),
		}),
	],
});

export default logger;
