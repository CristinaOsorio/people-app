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
import { PersonService } from '../../../core/services/person.service';
import {
    ALPHA_REGEX,
    PHONE_NUMBER_REGEX,
} from '../../../core/constants/regex.const';

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
    personService = inject(PersonService);

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
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(60),
                    Validators.pattern(ALPHA_REGEX),
                ],
            ],
            lastNamePaternal: [
                lastNamePaternal,
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(60),
                    Validators.pattern(ALPHA_REGEX),
                ],
            ],
            lastNameMaternal: [
                lastNameMaternal,
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(60),
                    Validators.pattern(ALPHA_REGEX),
                ],
            ],
            address: [
                address,
                [
                    Validators.required,
                    Validators.minLength(1),
                    Validators.maxLength(100),
                ],
            ],
            phone: [
                phone,
                [Validators.required, Validators.pattern(PHONE_NUMBER_REGEX)],
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

        return this.person ? this.update() : this.create();
    }

    create() {
        const data = this.personForm.value;
        this.personService
            .create(data)
            .subscribe((data) => this.data.emit(data));
    }

    update() {
        const data = this.personForm.value;
        this.personService
            .update(this.person!.id, data)
            .subscribe((data) => this.data.emit(data));
    }
}
