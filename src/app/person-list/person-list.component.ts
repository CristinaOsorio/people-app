import { Component, inject, signal } from '@angular/core';
import { Person } from '../core/interfaces/person.interface';
import { FormsModule } from '@angular/forms';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { PersonDeleteComponent } from './components/person-delete/person-delete.component';
import { PersonService } from '../core/services/person.service';
import { Action } from '../core/enums/action.enum';
import { InputSearchComponent } from '../shared/components/input-search/input-search.component';
import { PhoneFormatPipe } from '../core/pipes/phone-format.pipe';

@Component({
    selector: 'app-person-list',
    standalone: true,
    imports: [
        FormsModule,
        InputSearchComponent,
        ModalComponent,
        PersonFormComponent,
        PersonDeleteComponent,
        PhoneFormatPipe,
    ],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.css',
})
export default class PersonListComponent {
    titleModal = 'Person Form';
    isOpenModalForm = false;
    isOpenModalDelete = false;
    selectedPerson: Person | null = null;

    persons = signal<Person[]>([]);

    pageSize: number = 10;
    pageSizes: number[] = [5, 10, 20, 50, 100];
    totalItems: number = 0;
    currentPage: number = 1;
    totalPages: number = 0;
    filterParam: string = '';

    personService = inject(PersonService);

    ngOnInit(): void {
        this.loadPersons();
    }

    private loadPersons() {
        this.personService
            .getAll(this.filterParam, this.currentPage, this.pageSize)
            .subscribe((res) => {
                const { data, totalItems, currentPage, pageSize, totalPages } =
                    res;
                this.totalItems = totalItems;
                this.currentPage = currentPage;
                this.pageSize = pageSize;
                this.totalPages = totalPages;
                this.persons.set(data);
            });
    }

    onPageChange(page: number): void {
        if (this.pageSize != 1 && this.persons.length == 0) {
            this.currentPage = page;
            this.loadPersons();
        }
    }

    onPageSizeChange(newPageSize: number): void {
        this.pageSize = newPageSize;
        this.currentPage = 1;
        this.loadPersons();
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
        const action = this.selectedPerson ? Action.UPDATE : Action.CREATE;
        this.updateData(action, data);
        this.closeModal();
    }

    saveDelete(isDelete: boolean) {
        if (isDelete) {
            this.updateData(Action.DELETE);
        }
        this.closeModal();
    }

    search(text: string) {
        this.filterParam = text;
        this.currentPage = 1;
        this.loadPersons();
    }

    private updateData(action: Action, person?: Person) {
        if (action === Action.DELETE) return this.loadPersons();

        this.persons.update((prevPersons) => {
            switch (action) {
                case Action.CREATE:
                    return this.addPerson(prevPersons, person!);
                case Action.UPDATE:
                    return this.updatePerson(prevPersons, person!);
                default:
                    return prevPersons;
            }
        });
    }

    private addPerson(persons: Person[], newPerson: Person): Person[] {
        if (persons.length === this.pageSize) {
            persons.pop();
        }

        return [newPerson, ...persons];
    }

    private updatePerson(persons: Person[], updatedPerson: Person): Person[] {
        return persons.map((person) =>
            person.id === updatedPerson.id
                ? ({
                      ...updatedPerson,
                  } as Person)
                : person
        );
    }
}
