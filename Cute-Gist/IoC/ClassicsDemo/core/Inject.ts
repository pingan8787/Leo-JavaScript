import { Token } from "./type";
import "reflect-metadata";

const INJECT_METADATA_KEY = Symbol("INJECT_KEY");

export function Inject(token: Token<any>) {
  return function (target: any, _: string | symbol, index: number) {
    Reflect.defineMetadata(
      INJECT_METADATA_KEY,
      token,
      target,
      `index-${index}`
    );
  };
}
export function getInjectionToken(target: any, index: number) {
  return Reflect.getMetadata(INJECT_METADATA_KEY, target, `index-${index}`) as
    | Token<any>
    | undefined;
}
