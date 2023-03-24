import { AxiosInstance } from "axios";
import { createAxiosInstance } from "lib/services";
import { API_SERVICE } from "lib/utils";

class RpcClient {
  http: AxiosInstance;
  constructor() {
    this.http = createAxiosInstance({ baseURL: API_SERVICE });
  }
}

const rpcClient = new RpcClient();

export { rpcClient };
