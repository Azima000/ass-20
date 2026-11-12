import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({
  name: 'CheckPriceSale',
  async: false
})
export class CheckPriceSale implements ValidatorConstraintInterface {

  validate(value: number, args: ValidationArguments) {
    const originalPrice =(args.object as any)[args.constraints[0] as string];

    return Number(value) <= Number(originalPrice);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "sale price must be less than original price";
  }
}
export function IsGte(
  constraints: string[] = [],
  validationOptions?: ValidationOptions
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints,
      validator: CheckPriceSale
    });
  };
}