import { PAC_SCHEME } from "@/constants/server"

type TOverride<
  Type,
  NewType extends { [key in keyof Type]?: NewType[key] },
> = Omit<Type, keyof NewType> & NewType

type TPacProtocol = keyof typeof PAC_SCHEME

type TPacExtProtocol = (typeof PAC_SCHEME)[TPacProtocol]

interface IConnection {
  protocol: TPacProtocol
  port: number
  address: string
}

type TConnectionExt = TOverride<
  IConnection,
  {
    protocol: TPacExtProtocol
  }
>

interface ICredential {
  username: string
  password: string
}

interface IServerConnection {
  serverConfig: IConnection
  credentials: ICredential
}

type TServerConnectionExt = TOverride<
  IServerConnection,
  {
    serverConfig: TConnectionExt
  }
>

type TConStatus = "Connected" | "Connecting" | "Disconnected" | "Disconnecting"
