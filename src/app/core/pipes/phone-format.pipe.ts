import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
    transform(phoneNumber: string): string {
        if (!phoneNumber) {
            return '';
        }

        const cleaned = ('' + phoneNumber).replace(/\D/g, '');

        const part1 = cleaned.slice(0, 3);
        const part2 = cleaned.slice(3, 6);
        const part3 = cleaned.slice(6);

        return `(${part1}) ${part2}-${part3}`;
    }
}
