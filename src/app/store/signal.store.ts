import { Signal, computed, signal } from "@angular/core";

export class SignalStore<T> {
    readonly state = signal({} as T);
    
    constructor() {}
    
    
    /**
     * Crea una señal con la propiedad a leer del estado
     *
     * @param key - el nombre de la propiedad que se va a leer
     */
    public select<K extends keyof T>(key: K): Signal<T[K]>{
        return computed(() => this.state()[key]);
    }
    
   /**
    * Este actualiza una sola propiedad del estado
    *
    * @param key - el nombre de la propiedad que se va guardar
    * @param data - la informació a guardar
    */
    public set<K extends keyof T>(key: K, data: T[K]) {
      this.state.update((currentValue) => ({ ...currentValue, [key]: data }));
    }
    
    /**
    * Este se utiliza cuando es necesario actualizar 
    * varias propiedades del estado.
    *
    * @param partialState - el estado Parcial o multiples propiedades
    *                      a guardar
    */
    public setState(partialState: Partial<T>): void {
      this.state.update((currentValue) => ({ ...currentValue, ...partialState }));
    }
}