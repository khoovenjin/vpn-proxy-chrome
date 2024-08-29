import axios, { AxiosInstance } from "axios"

type TApiMap = Record<
  string,
  {
    request: Partial<Record<"data" | "params", unknown>>
    response: Record<string, unknown> | string
  }
>

type TExtractInfer<T, U extends keyof T> = T extends {
  [Key in U]: infer V
}
  ? V
  : undefined

export class Requestor<ApiMap extends TApiMap> {
  private defaults: AxiosInstance["defaults"] = {
    ...axios.defaults,
    baseURL: "",
    timeout: 10000,
  }
  private instance: AxiosInstance

  constructor(config?: Partial<AxiosInstance["defaults"]>) {
    if (config) this.defaults = { ...this.defaults, ...config }

    this.instance = axios.create(this.defaults)
  }

  public async get<K extends keyof ApiMap>(
    path: K,
    params?: TExtractInfer<ApiMap[K]["request"], "params">,
    data?: TExtractInfer<ApiMap[K]["request"], "data">
  ) {
    const config = {
      ...(params && { params }),
      ...(data && { data }),
    }

    const response = await this.instance.get<ApiMap[K]["response"]>(
      path as string,
      config
    )

    return response.data
  }
}
