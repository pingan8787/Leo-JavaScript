// container.test.ts
import { Container } from "./core/container";
import { Injectable } from "./core/Injectable";
import { Inject } from "./core/Inject";
import { InjectionToken } from "./core/type";

const API_URL = new InjectionToken("apiUrl");

@Injectable()
class HttpClient {}

@Injectable()
class HttpService {
  constructor(
    private httpClient: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}
}

const container = new Container();

container.addProvider({
  provide: API_URL,
  useValue: "https://www.semlinker.com/"
});

container.addProvider({ provide: HttpClient, useClass: HttpClient });
container.addProvider({ provide: HttpService, useClass: HttpService });

const httpService = container.inject(HttpService);
console.dir(httpService);
