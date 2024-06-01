import Joi from 'joi';
const { object, string } = Joi.types();

export const registration = Joi.object({
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
}).options({ abortEarly: false });
