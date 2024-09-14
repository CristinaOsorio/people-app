import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../../core/interfaces/person.interface';

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

    deletePerson() {
        this.data.emit(true);
    }
}
