const Joi = require('@hapi/joi')

const prontuarioSchema = {
  
  situacao    : Joi.number().integer().min(0).required(),
  data_hora   : Joi.date().iso(),
}

const pessoaSchema = {   
    //id              : Joi.number().integer().min(1),
    nome              : Joi.string().min(3).max(60).required(),
    data_nascimento   : Joi.date().iso(),
    cidade_id         : Joi.number().integer().min(0).required(),
    situacao          : Joi.number().integer().min(0).required(),
    prontuario        : Joi.object().keys(prontuarioSchema).allow(null),
}
class PessoaHelper {

    constructor() {
      this.schema = pessoaSchema;
    }

    isValidCreate(payload) {
        delete this.schema.id
        const schema = Joi.object().keys(this.schema);
        const result = schema.validate(payload, { allowUnknown : true, stripUnknown : true})
        return this.resetJoiErrorMessage(result)          
    }

    isValidUpdate(payload) {
        this.schema.id = Joi.number().integer().required();
        const schema = Joi.object().keys(this.schema);
        const result = schema.validate(payload, {allowUnknown : true});
        return this.resetJoiErrorMessage(result)           
    }

    resetJoiErrorMessage(joiResult) {

      if (joiResult.error) {
        const erro = []
        if (joiResult.error.details && joiResult.error.details.length > 0) {
          joiResult.error.details.map(function(e) {
            erro.push(e.path)
            erro.push(e.message);
          })
          joiResult.error.msg = erro;

        }
      }
      return joiResult
    }
}

let pessoaHelper = new PessoaHelper();
module.exports   = pessoaHelper;