// Интерфейс для инверсии зависимости, чтобы использовать в другом коде,

import { Settings } from "./AudioController";

// не связываясь с конкретной реализацией
interface IEvents {
	on<T extends EventData>(event: string, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
	trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

type EventData = {
	name?: string,
	settings?: Settings
}

// Хорошая практика — даже простые типы выносить в алиасы.
// Когда захотите поменять, достаточно сделать это в одном месте
type Subscriber = Function;
type EmitterEvent = {
	eventName: string,
	data: unknown
};

/**
 * Брокер событий, классическая реализация.
 * В расширенном варианте можно реализовать 
 * отслеживание событий по шаблону, например 
 * одноразовые события, троттлинг и т.д.
 */
export class EventEmitter implements IEvents {
	_events: Map<string, Set<Subscriber>>;

	constructor() {
		this._events = new Map<string, Set<Subscriber>>();
	}

	/**
	 * Установить обработчик на событие
	 */
	on<T extends EventData>(eventName: string, callback: (event: T) => void) {
		if (!this._events.has(eventName)) {
			this._events.set(eventName, new Set<Subscriber>());
		}
		this._events.get(eventName)?.add(callback);
	}

	/**
	 * Снять обработчик с события
	 */
	off(eventName: string, callback: Subscriber) {
		if (this._events.has(eventName)) {
			this._events.get(eventName)!.delete(callback);
			if (this._events.get(eventName)?.size === 0) {
				this._events.delete(eventName);
			}
		}
	}

	/**
	 * Инициировать событие с данными
	 */
	emit<T extends object>(eventName: string, data?: T) {
		if (this._events.has(eventName)) {
			this._events.get(eventName)!.forEach(callback => callback(data));
		}
		// так вызываем обработчики, слушающие все события
		if (this._events.has("*")) {
			this._events.get(("*"))!.forEach(callback => callback({ eventName, data }));
		}
	}

	/**
	 * Сбросить все обработчики
	 */
	offAll() {
		this._events = new Map<string, Set<Subscriber>>();
	}

	/**
	 * Сделать колбэк-триггер, генерирующий событие при вызове
	 */
	trigger<T extends object>(eventName: string, context?: Partial<T>) {
		return (event: object = {}) => {
			this.emit(eventName, {
				...(event || {}),
				...(context || {})
			});
		};
	}
}