import _ from 'lodash';

export const parametersValidations = (object, ...parameters) => {

  _.forEach(parameters, parameter => {

    if (!object[parameter]) 
      throwMissingParamException(parameter);
    }
  );
};

const throwMissingParamException = parameter => {

  throw `Missing parameter ${parameter}`;
};
