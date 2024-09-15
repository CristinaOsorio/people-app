import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Person, PersonCreate } from '../interfaces/person.interface';
import { PaginatedResponse } from '../interfaces/paginate.interface';
import { handleError } from '../handles/errosr.handle';

@Injectable({
    providedIn: 'root',
})
export class PersonService {
    private apiUrl = 'http://localhost:3000/api/persons';
    private http = inject(HttpClient);
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    getAll(
        filterParam: string = '',
        page: number = 1,
        pageSize: number = 10
    ): Observable<PaginatedResponse<Person>> {
        let params = new HttpParams()
            .set('filterParam', filterParam)
            .set('page', page.toString())
            .set('pageSize', pageSize.toString());

        return this.http
            .get<PaginatedResponse<Person>>(this.apiUrl, { params })
            .pipe(
                catchError(
                    handleError<PaginatedResponse<Person>>('getAll', {
                        data: [],
                        totalItems: 0,
                        currentPage: 1,
                        pageSize: 10,
                        totalPages: 0,
                    })
                )
            );
    }

    getOne(id: number): Observable<Person> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
            .get<Person>(url)
            .pipe(catchError(handleError<Person>(`getOne id=${id}`)));
    }

    create(person: PersonCreate): Observable<Person> {
        return this.http
            .post<Person>(this.apiUrl, person, this.httpOptions)
            .pipe(catchError(handleError<Person>('create')));
    }

    update(id: number, person: Person): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
            .put(url, person, this.httpOptions)
            .pipe(catchError(handleError<any>('update')));
    }

    delete(id: number): Observable<Person> {
        const url = `${this.apiUrl}/${id}`;
        return this.http
            .delete<Person>(url)
            .pipe(catchError(handleError<Person>('delete')));
    }
}
