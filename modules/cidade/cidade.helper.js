const Joi = require('@hapi/joi')

const cidadeSchema = {
  
    nome              : Joi.string().min(3).max(60).required(),
    uf                : Joi.string().min(2).max(2).required()
}
class CidadeHelper {

    constructor() {
      this.schema = cidadeSchema;
    }

    isValidCreate(payload) {
        delete this.schema.id
        const schema = Joi.object().keys(this.schema);
        const result = schema.validate(payload, {allowUnknown : true, stripUnknown : true})
        return this.resetJoiErrorMessage(result)
    }

    isValidUpdate(payload) {

        this.schema.id = Joi.number().integer().required()
         const schema = Joi.object().keys(this.schema)
        const result = schema.validate(payload, {allowUnknown : true})
        return this.resetJoiErrorMessage(result)
    }

    resetJoiErrorMessage(joiResult) {
      if (joiResult.error) {
        const erro = [];
        if (joiResult.error.details && joiResult.error.details.length > 0) {
          joiResult.error.details.map(function(e) {
            erro.push(e.path)           
            erro.push(e.message);
          });
          joiResult.error.msg = erro;
          
        }
      }
      return joiResult
    }
}

let cidadeHelper = new CidadeHelper();
module.exports   = cidadeHelper;