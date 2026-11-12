import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
    constructor(private readonly Schema: ZodType) { }

    transform(value: any, metadata: ArgumentMetadata) {
    const result = this.Schema.safeParse(value);

    if (!result.success) {
        throw new BadRequestException(result.error.issues);
    }

    return result.data;
}
}