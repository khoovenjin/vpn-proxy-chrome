import { SERVER_LIST } from "@/constants/country"

type TCountry = (typeof SERVER_LIST)[number]

type TServerList = {
  serverList: typeof SERVER_LIST
}
