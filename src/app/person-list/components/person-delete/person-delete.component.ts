import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Person } from '../../../core/interfaces/person.interface';
import { PersonService } from '../../../core/services/person.service';

@Component({
    selector: 'app-person-delete',
    standalone: true,
    imports: [],
    templateUrl: './person-delete.component.html',
    styleUrl: './person-delete.component.css',
})
export class PersonDeleteComponent {
    @Input({ required: true }) person!: Person;
    @Output() data = new EventEmitter<boolean>();
    personService = inject(PersonService);

    deletePerson() {
        this.personService
            .delete(this.person.id)
            .subscribe((data) => this.data.emit(true));
    }
}
