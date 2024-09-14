import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { Person } from '../../../core/interfaces/person.interface';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';

@Component({
    selector: 'app-person-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
    templateUrl: './person-form.component.html',
    styleUrl: './person-form.component.css',
})
export class PersonFormComponent implements OnInit {
    @Input({ required: true }) person!: Person | null;
    @Output() data = new EventEmitter<Person>();

    fb = inject(FormBuilder);

    personForm!: FormGroup;

    ngOnInit() {
        const {
            firstName = null,
            lastNamePaternal = null,
            lastNameMaternal = null,
            address = null,
            phone = null,
        } = this.person || {};

        this.personForm = this.fb.group({
            firstName: [
                firstName,
                [Validators.required, Validators.minLength(2)],
            ],
            lastNamePaternal: [
                lastNamePaternal,
                [Validators.required, Validators.minLength(2)],
            ],
            lastNameMaternal: [
                lastNameMaternal,
                [Validators.required, Validators.minLength(2)],
            ],
            address: [address, [Validators.required, Validators.minLength(5)]],
            phone: [
                phone,
                [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
            ],
        });
    }

    get firstName() {
        return this.personForm.get('firstName') as FormControl;
    }
    get lastNamePaternal() {
        return this.personForm.get('lastNamePaternal') as FormControl;
    }
    get lastNameMaternal() {
        return this.personForm.get('lastNameMaternal') as FormControl;
    }
    get address() {
        return this.personForm.get('address') as FormControl;
    }
    get phone() {
        return this.personForm.get('phone') as FormControl;
    }

    onSubmit() {
        if (this.personForm.invalid) {
            return this.personForm.markAllAsTouched();
        }
        this.data.emit({ ...this.person, ...this.personForm.value });
        console.log(this.personForm.value);
    }
}
