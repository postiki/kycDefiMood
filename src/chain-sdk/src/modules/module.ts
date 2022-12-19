import { Client } from '../client';

export abstract class Module {
  protected readonly client: Client;

  constructor(client: Client) {
    this.client = client;
    if (client.connected) {
      this.init();
    }
    
    this.client.on('connect', () => this.init());
  }

  protected abstract init(): void;
}
