import type { InjectionKey } from "vue";

export const symbolStringKey = Symbol() as InjectionKey<string>;
export const symbolNumberKey = Symbol() as InjectionKey<number>;