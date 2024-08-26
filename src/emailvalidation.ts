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
  import { Injectable } from '@nestjs/common';
  import { UserService } from './user/user.service';
  
  @ValidatorConstraint({ async: true })
  @Injectable()
  export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}
  
    async validate(email: string, args: ValidationArguments) {
      const user = await this.userService.findByEmail(email);
      return !user; // Returns true if the email is not registered, otherwise false
    }
  
    defaultMessage(args: ValidationArguments) {
      return 'Email ($value) is already registered';
    }
  }
  
  export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailAlreadyExistConstraint,
      });
    };
  }
  