export abstract class IEnumerator<T> {
    abstract moveNext(): boolean;
    abstract get current() : T;
    abstract reset(): void;

    foreach(factory: (item: T) => void) {
        this.reset();
        while(this.moveNext()) {
            factory(this.current);
        }
    }
}