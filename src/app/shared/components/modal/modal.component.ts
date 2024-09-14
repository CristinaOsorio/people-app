import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
})
export class ModalComponent {
    @Input({ required: true }) title!: string;
    @Output() isClose = new EventEmitter<boolean>();

    closeModal() {
        this.isClose.emit(true);
    }
}
