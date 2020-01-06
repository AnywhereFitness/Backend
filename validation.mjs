import Joi from '@hapi/joi';

export const registerValidation = data => {
  const schema = Joi.object({
    firstName: Joi.string()
      .max(64)
      .required(),
    lastName: Joi.string()
      .max(64)
      .required(),
    email: Joi.string()
      .min(6)
      .max(120)
      .required()
      .email({ minDomainSegments: 2 }),
    password: Joi.string()
      .min(6)
      .required(),
    role: Joi.string().valid('client', 'instructor')
  });
  return schema.validate(data);
};

export const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .max(120)
      .required()
      .email({ minDomainSegments: 2 }),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};
