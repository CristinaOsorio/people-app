import { Component } from '@angular/core';
import { Person } from '../core/interfaces/person.interface';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-person-list',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.css',
})
export default class PersonListComponent {
    persons: Person[] = [
        {
            firstName: 'Juan',
            lastNamePaternal: 'Pérez',
            lastNameMaternal: 'González',
            address: 'Calle Falsa 123, Ciudad',
            phone: '555-1234',
        },
        {
            firstName: 'Ana',
            lastNamePaternal: 'López',
            lastNameMaternal: 'Martínez',
            address: 'Avenida Central 456, Ciudad',
            phone: '555-5678',
        },
        {
            firstName: 'Luis',
            lastNamePaternal: 'Ramírez',
            lastNameMaternal: 'Hernández',
            address: 'Boulevard Norte 789, Ciudad',
            phone: '555-9012',
        },
        {
            firstName: 'Carlos',
            lastNamePaternal: 'Mendoza',
            lastNameMaternal: 'Castillo',
            address: 'Calle del Sol 987, Ciudad',
            phone: '555-3456',
        },
        {
            firstName: 'Laura',
            lastNamePaternal: 'Garza',
            lastNameMaternal: 'Salinas',
            address: 'Plaza Mayor 345, Ciudad',
            phone: '555-7890',
        },
        {
            firstName: 'Raúl',
            lastNamePaternal: 'Fernández',
            lastNameMaternal: 'Ortega',
            address: 'Paseo de la Reforma 123, Ciudad',
            phone: '555-6543',
        },
    ];
    pageSize: number = 10;
    pageSizes: number[] = [5, 10, 20, 50, 100];

    onPageSizeChange(newPageSize: number): void {
        this.pageSize = newPageSize;
    }
}
