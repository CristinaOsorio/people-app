import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-input-search',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './input-search.component.html',
    styleUrls: ['./input-search.component.css'],
})
export class InputSearchComponent implements OnInit {
    @Output() onDebounce: EventEmitter<string> = new EventEmitter<string>();
    @Input() placeholder: string = 'Buscar...';
    text: string = '';

    debounce: Subject<string> = new Subject();

    ngOnInit(): void {
        this.debounce.pipe(debounceTime(500)).subscribe((value) => {
            this.onDebounce.emit(value);
        });
    }

    keyPressed() {
        this.debounce.next(this.text.trim());
    }
}
