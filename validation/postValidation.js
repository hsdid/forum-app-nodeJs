const Joi = require('Joi');

const postValidation = data => {

        const schema = Joi.object({
                title: Joi.string()
                    .min(5)
                    .required(),
                content: Joi.string() 
                    .min(5) 
                    .required(),
                categoryId: Joi.number()
                    .integer()
                    .required()
                });

        return schema.validate(data);
};



module.exports.postValidation = postValidation;