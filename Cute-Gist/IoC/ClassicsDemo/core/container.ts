import { InjectionToken, Token, Type } from "./type";
import {
  ClassProvider,
  isClassProvider,
  ValueProvider,
  isValueProvider,
  FactoryProvider,
  isFactoryProvider,
  Provider
} from "./provider";
import { isInjectable } from "./Injectable";
import { getInjectionToken } from "./Inject";

type InjectableParam = Type<any>;
const REFLECT_PARAMS = "design:paramtypes";

export class Container {
  // addProvider<T>(provider: Provider<T>) {} // TODO
  // inject<T>(type: Token<T>): T {} // TODO

  private providers = new Map<Token<any>, Provider<any>>();

  addProvider<T>(provider: Provider<T>) {
    this.assertInjectableIfClassProvider(provider);
    this.providers.set(provider.provide, provider);
  }

  private assertInjectableIfClassProvider<T>(provider: Provider<T>) {
    if (isClassProvider(provider) && !isInjectable(provider.useClass)) {
      throw new Error(`
        Cannot provite ${this.getTokenName(
          provider.provide
        )} useing class ${this.getTokenName(
        provider.useClass
      )},${this.getTokenName(provider.useClass)} isn't injectable!
      `);
    }
  }

  private getTokenName<T>(token: Token<T>) {
    return token instanceof InjectionToken
      ? token.injectionIdentifier
      : token.name;
  }

  inject<T>(type: Token<T>) {
    let provider = this.providers.get(type);
    if (provider === undefined && !(type instanceof InjectionToken)) {
      provider = { provide: type, useClass: type };
      this.assertInjectableIfClassProvider(provider);
    }
    return this.injectWithProvider(type, provider);
  }

  private injectWithProvider<T>(type: Token<T>, provider?: Provider<T>) {
    if (provider === undefined) {
      throw new Error(`No provider for type ${this.getTokenName(type)}`);
    }
    if (isClassProvider(provider)) {
      return this.injectClass(provider as ClassProvider<T>);
    } else if (isValueProvider(provider)) {
      return this.injectValue(provider as ValueProvider<T>);
    } else if (isFactoryProvider(provider)) {
      return this.injectFactory(provider as FactoryProvider<T>);
    }
  }

  // { provide: HttpClient, useClass: HttpClient }
  private injectClass<T>(classProvider: ClassProvider<T>): T {
    const target = classProvider.useClass;
    const params = this.getInjectedParams(target);
    return Reflect.construct(target, params);
  }

  // { provide: API_URL, useValue: 'https://www.semlinker.com/' }
  private injectValue<T>(valueProvider: ValueProvider<T>): T {
    return valueProvider.useValue;
  }
  // const input = { x: 200 };
  // container.addProvider({ provide: BasicClass, useFactory: () => input });
  private injectFactory<T>(valueProvider: FactoryProvider<T>): T {
    return valueProvider.useFactory();
  }

  private getInjectedParams<T>(target: Type<T>) {
    const argTypes = Reflect.getMetadata(REFLECT_PARAMS, target) as (
      | InjectableParam
      | undefined
    )[];
    if (argTypes === undefined) {
      return [];
    }
    return argTypes.map((argType, index) => {
      // The reflect-metadata API fails on circular dependencies, and will return undefined
      // for the argument instead.
      if (argType === undefined) {
        throw new Error(
          `Injection error. Recursive dependency detected in constructor for type ${target.name} 
             with parameter at index ${index}`
        );
      }
      const overrideToken = getInjectionToken(target, index);
      const actualToken = overrideToken === undefined ? argType : overrideToken;
      let provider = this.providers.get(actualToken);
      return this.injectWithProvider(actualToken, provider);
    });
  }
}

const container = new Container();
const input = { x: 200 };
class BasicClass {}
// 注册ClassProvider
container.addProvider({ provide: BasicClass, useClass: BasicClass });
// 注册ValueProvider
container.addProvider({ provide: BasicClass, useValue: input });
// 注册FactoryProvider
container.addProvider({ provide: BasicClass, useFactory: () => input });
const output = container.inject(BasicClass);
expect(input).toBe(output); // true
