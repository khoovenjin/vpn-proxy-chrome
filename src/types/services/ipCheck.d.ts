export type TIpCheckRequest = {
  params: {
    format: string
  }
}

type TIpCheckResponse = string

type TIpCheck = {
  request: TIpCheckRequest
  response: TIpCheckResponse
}
