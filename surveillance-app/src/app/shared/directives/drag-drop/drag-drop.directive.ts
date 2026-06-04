import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[appDragDrop]',
    standalone: true
})
export class DragDropDirective {
    // Recibe la información del elemento que estamos arrastrando (ej. la cámara)
    @Input('appDragDrop') dragData: any;

    // Emite un evento cuando soltamos otro elemento encima de este
    @Output() itemDropped = new EventEmitter<any>();

    // Le dice al navegador HTML que este elemento se puede agarrar
    @HostBinding('draggable') isDraggable = true;

    // Añade una clase CSS dinámica cuando lo estamos arrastrando
    @HostBinding('class.is-dragging') isDragging = false;

    // 1. Cuando empezamos a arrastrar
    @HostListener('dragstart', ['$event'])
    onDragStart(event: DragEvent) {
        this.isDragging = true;
        if (event.dataTransfer) {
            // Guardamos los datos de la cámara en la memoria temporal del ratón
            event.dataTransfer.setData('application/json', JSON.stringify(this.dragData));
            event.dataTransfer.effectAllowed = 'move';
        }
    }

    // 2. Cuando soltamos el ratón al aire o terminamos
    @HostListener('dragend', ['$event'])
    onDragEnd(event: DragEvent) {
        this.isDragging = false;
    }

    // 3. Cuando pasamos un elemento por encima de este (necesario para permitir soltar)
    @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent) {
        event.preventDefault(); // Apaga el comportamiento por defecto del navegador
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'move';
        }
    }

    // 4. Cuando soltamos el elemento encima de este
    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        if (event.dataTransfer) {
            const droppedDataString = event.dataTransfer.getData('application/json');
            if (droppedDataString) {
                const droppedData = JSON.parse(droppedDataString);
                // Avisamos al componente padre que recibimos un elemento
                this.itemDropped.emit(droppedData);
            }
        }
    }
}