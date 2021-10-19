import EventEmitter from 'node:events';

export declare interface Cluster {
  id: number;
  lastHeartbeat: number;
  user: string;
}

export declare interface Data {
  type: 0 | 1 | 2;
  data: any;
}

export declare enum GenericCloseCodes {
  ServerRestarting,
  InvalidData,
  ServerError,
  NotReadyForData
}

export declare interface Events {
  authenticated: (id: number, totalClusters: number, user: string) => void;
  data: (
    id: number,
    data: Data,
    cb: (success: boolean, code?: GenericCloseCodes) => void
  ) => void;
  disconnected: (cluster: number, code: number | Error) => void;
}

export declare interface ServerService extends EventEmitter {
  on<U extends keyof Events>(event: U, listener: Events[U]): this;
  once<U extends keyof Events>(event: U, listener: Events[U]): this;
  off<U extends keyof Events>(event: U, listener: Events[U]): this;
  addListener<U extends keyof Events>(event: U, listener: Events[U]): this;
  emit<U extends keyof Events>(
    event: U,
    ...args: Parameters<Events[U]>
  ): boolean;
  name: string;
  getCluster(id: number): Cluster;
  getAllClusters(): { [key: number]: Cluster };
  disconnectCluster(id: number, code: GenericCloseCodes): void;
  serverClosing(): void;
  dataPushed(): void;
}
