import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsDateNotInFuture(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsDateNotInFuture',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const dateValue = new Date(value);
          const now = new Date();
          return dateValue <= now;
        },
      },
    });
  };
}