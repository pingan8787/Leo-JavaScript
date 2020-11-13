export interface Type<T> extends Function {
  new (...args: any[]): T;
}

export class InjectionToken {
  constructor(public injectionIdentifier: string) {}
}

export type Token<T> = Type<T> | InjectionToken;
