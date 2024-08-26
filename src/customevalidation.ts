/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  import moment = require('moment');
  
  @ValidatorConstraint({ async: false })
  export class IsNotPastDateConstraint implements ValidatorConstraintInterface {
    validate(dueDate: string, args: ValidationArguments) {
      const currentDate = moment().startOf('day');
      const dueDateMoment = moment(dueDate).startOf('day');
      return dueDateMoment.isSameOrAfter(currentDate);
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Due date ($value) cannot be in the past';
    }
  }
  
  export function IsNotPastDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsNotPastDateConstraint,
      });
    };
  }
  