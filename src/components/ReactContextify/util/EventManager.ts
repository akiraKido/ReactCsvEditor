interface EventObject { token: number; callback: (e: MouseEvent, ...args: any[]) => void }

export class EventManager {
    static eventList : Map<string, Array<EventObject>> = new Map();
    static token = 0;

    static on(event:string, callback:(e:MouseEvent, ...args: any[]) => void): number {
        this.eventList.has(event) || this.eventList.set(event, []);
        this.token++;
        this.eventList.get(event).push({
            token: this.token,
            callback
        });

        return this.token;
    }

    static off(event:string, token: number = null) {
        if(token === null) {
            return this.eventList.delete(event);
        }
        const events = this.eventList.get(event).filter(e => e.token !== token);
        this.eventList.set(event, events);
    }

    static has(event: string) {
        return this.eventList.has(event);
    }

    static emit(event:string, ...args:any[]): boolean {
        if(!this.eventList.has(event)) {
            console.warn(`<${event}> Event is not registered. Did you forget to bind the event?`);
            return false;
        }
        this.eventList
            .get(event)
            .forEach(
                // TODO: understand what happends on "call"
                listener => listener.callback.call(this, ...args)
            );
        return true;
    }
}