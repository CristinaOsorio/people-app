export interface Person {
    id: number;
    firstName: string;
    lastNamePaternal: string;
    lastNameMaternal: string;
    address: string;
    phone: string;
}

export interface PersonCreate extends Omit<Person, 'id'> {}

export interface PersonEdit extends Partial<PersonCreate> {}
