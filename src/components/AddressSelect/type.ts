export type CityType = {
  city_id  : number
  city_name: string
}

export type DistrictType = {
  district_id  : number
  district_name: string
}

export type BizcircleType = {
  bizcircle_id  : number
  bizcircle_name: string
}

export type AddressType = {
  city_id?       : number
  city_name?     : string
  district_id?   : number
  district_name? : string
  bizcircle_id?  : number
  bizcircle_name?: string
}

