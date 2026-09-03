import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

type Handler = (...args: any[]) => void;

/**
 * Drop-in replacement for the `Events` service that Ionic removed in v5.
 * Keeps the publish / subscribe / unsubscribe API the app already relies on;
 * handlers run synchronously in the order they subscribed.
 */
@Injectable({ providedIn: 'root' })
export class Events {
  private readonly channels = new Map<string, Subject<any[]>>();
  private readonly handlers = new Map<string, Map<Handler, Subscription>>();

  publish(topic: string, ...args: any[]): void {
    this.channel(topic).next(args);
  }

  subscribe(topic: string, ...handlers: Handler[]): void {
    const registry = this.registry(topic);
    for (const handler of handlers) {
      registry.set(handler, this.channel(topic).subscribe(args => handler(...args)));
    }
  }

  /** Removes one handler, or every handler for the topic when none is given. */
  unsubscribe(topic: string, handler?: Handler): boolean {
    const registry = this.handlers.get(topic);
    if (!registry) {
      return false;
    }
    if (handler) {
      const subscription = registry.get(handler);
      if (!subscription) {
        return false;
      }
      subscription.unsubscribe();
      registry.delete(handler);
      return true;
    }
    registry.forEach(subscription => subscription.unsubscribe());
    this.handlers.delete(topic);
    return true;
  }

  private channel(topic: string): Subject<any[]> {
    let channel = this.channels.get(topic);
    if (!channel) {
      channel = new Subject<any[]>();
      this.channels.set(topic, channel);
    }
    return channel;
  }

  private registry(topic: string): Map<Handler, Subscription> {
    let registry = this.handlers.get(topic);
    if (!registry) {
      registry = new Map<Handler, Subscription>();
      this.handlers.set(topic, registry);
    }
    return registry;
  }
}
