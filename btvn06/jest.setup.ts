import '@testing-library/jest-dom';

class MockHeaders {
  private map = new Map<string, string>();

  constructor(init?: Record<string, string> | HeadersInit | [string, string][]) {
    if (!init) return;

    if (Array.isArray(init)) {
      init.forEach(([key, value]) => {
        this.map.set(key.toLowerCase(), String(value));
      });
      return;
    }

    if (typeof (init as Headers).forEach === 'function') {
      (init as Headers).forEach((value, key) => {
        this.map.set(key.toLowerCase(), value);
      });
      return;
    }

    Object.entries(init as Record<string, string>).forEach(([key, value]) => {
      this.map.set(key.toLowerCase(), String(value));
    });
  }

  append(name: string, value: string) {
    const key = name.toLowerCase();
    this.map.set(key, `${this.map.get(key) ?? ''}${this.map.get(key) ? ', ' : ''}${value}`);
  }

  delete(name: string) {
    this.map.delete(name.toLowerCase());
  }

  get(name: string) {
    return this.map.get(name.toLowerCase()) ?? null;
  }

  has(name: string) {
    return this.map.has(name.toLowerCase());
  }

  set(name: string, value: string) {
    this.map.set(name.toLowerCase(), String(value));
  }

  forEach(callback: (value: string, key: string) => void) {
    this.map.forEach((value, key) => callback(value, key));
  }

  keys() {
    return this.map.keys();
  }

  values() {
    return this.map.values();
  }

  entries() {
    return this.map.entries();
  }
}

class MockRequest {
  public url: string;
  public method: string;
  public headers: MockHeaders;
  public body?: string | null;

  constructor(input: string | URL, init: RequestInit = {}) {
    this.url = String(input);
    this.method = (init.method ?? 'GET').toUpperCase();
    this.headers = new MockHeaders((init.headers as Record<string, string>) ?? {});
    this.body = init.body ? String(init.body) : null;
  }
}

class MockResponse {
  public ok: boolean;
  public status: number;
  public statusText: string;
  public headers: MockHeaders;
  public body: string;

  constructor(body?: BodyInit | null, init: ResponseInit = {}) {
    this.body = typeof body === 'string' ? body : body ? JSON.stringify(body) : '';
    this.status = init.status ?? 200;
    this.statusText = init.statusText ?? 'OK';
    this.headers = new MockHeaders((init.headers as Record<string, string>) ?? {});
    this.ok = this.status >= 200 && this.status < 300;
  }

  async json() {
    return JSON.parse(this.body || 'null');
  }

  async text() {
    return this.body;
  }

  clone() {
    return new MockResponse(this.body, {
      status: this.status,
      statusText: this.statusText,
      headers: this.headers as unknown as HeadersInit,
    });
  }
}

(globalThis as typeof globalThis & { Request: typeof Request; Response: typeof Response; Headers: typeof Headers }).Request = MockRequest as unknown as typeof Request;
(globalThis as typeof globalThis & { Request: typeof Request; Response: typeof Response; Headers: typeof Headers }).Response = MockResponse as unknown as typeof Response;
(globalThis as typeof globalThis & { Request: typeof Request; Response: typeof Response; Headers: typeof Headers }).Headers = MockHeaders as unknown as typeof Headers;

(globalThis as typeof globalThis & { fetch: jest.Mock }).fetch = jest.fn(() =>
  Promise.resolve(new MockResponse('[]', { status: 200 })),
) as jest.Mock;
