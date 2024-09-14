import { Component } from '@angular/core';
import { Person } from '../core/interfaces/person.interface';
import { FormsModule } from '@angular/forms';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { PersonDeleteComponent } from './components/person-delete/person-delete.component';

@Component({
    selector: 'app-person-list',
    standalone: true,
    imports: [
        FormsModule,
        PersonFormComponent,
        ModalComponent,
        PersonDeleteComponent,
    ],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.css',
})
export default class PersonListComponent {
    titleModal = 'Person Form';
    isOpenModalForm = false;
    isOpenModalDelete = false;
    showComponent: 'personForm' | 'personDelete' = 'personForm';
    selectedPerson: Person | null = null;

    persons: Person[] = [
        {
            id: 1,
            firstName: 'Juan',
            lastNamePaternal: 'Pérez',
            lastNameMaternal: 'González',
            address: 'Calle Falsa 123, Ciudad',
            phone: '555-1234',
        },
        {
            id: 2,
            firstName: 'Ana',
            lastNamePaternal: 'López',
            lastNameMaternal: 'Martínez',
            address: 'Avenida Central 456, Ciudad',
            phone: '555-5678',
        },
        {
            id: 3,
            firstName: 'Luis',
            lastNamePaternal: 'Ramírez',
            lastNameMaternal: 'Hernández',
            address: 'Boulevard Norte 789, Ciudad',
            phone: '555-9012',
        },
        {
            id: 4,
            firstName: 'Carlos',
            lastNamePaternal: 'Mendoza',
            lastNameMaternal: 'Castillo',
            address: 'Calle del Sol 987, Ciudad',
            phone: '555-3456',
        },
        {
            id: 5,
            firstName: 'Laura',
            lastNamePaternal: 'Garza',
            lastNameMaternal: 'Salinas',
            address: 'Plaza Mayor 345, Ciudad',
            phone: '555-7890',
        },
        {
            id: 6,
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

    openModalForm(person?: Person) {
        this.titleModal = person ? 'Editar persona' : 'Crear persona';
        this.isOpenModalForm = !this.isOpenModalForm;
        this.selectedPerson = person || null;
    }

    openModalDelete(person: Person) {
        this.titleModal = 'Eliminar persona';
        this.isOpenModalDelete = !this.isOpenModalDelete;
        this.selectedPerson = person;
    }

    closeModal() {
        this.isOpenModalDelete = false;
        this.isOpenModalForm = false;
        this.titleModal = '';
        this.selectedPerson = null;
    }

    saveChanges(data: Person) {
        this.selectedPerson ? this.updatePerson(data) : this.addPerson(data);
        this.closeModal();
    }

    addPerson(data: Person) {
        this.persons.push(data);
    }

    updatePerson(data: Person) {
        const index = this.persons.findIndex((person) => person.id === data.id);
        this.persons[index] = { ...data };
    }

    saveDelete(isDelete: boolean) {
        if (isDelete) {
            const { id } = this.selectedPerson || {};
            this.persons = this.persons.filter((person) => person.id !== id);
        }
        this.closeModal();
    }
}
