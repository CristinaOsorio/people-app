import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-field',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './form-field.component.html',
    styleUrl: './form-field.component.css',
})
export class FormFieldComponent {
    @Input() label!: string;
    @Input() control!: FormControl;
    @Input() type: string = 'text';
    @Input() placeholder?: string;

    get errorMessage(): string | null {
        if (this.control.errors) {
            if (this.control.errors['required']) {
                return `${this.label} es obligatorio.`;
            }
            if (this.control.errors['minlength']) {
                return `${this.label} debe tener al menos ${this.control.errors['minlength'].requiredLength} caracteres.`;
            }
            if (this.control.errors['pattern']) {
                return `Formato de ${this.label} inválido.`;
            }
        }
        return null;
    }
}
