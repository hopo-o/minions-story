export type TAvailable = 0 | 1

// 上午，下午
export type ETime = 1 | 2

export type TDateStatus = {
  forenoon_available : TAvailable
  afternoon_available: TAvailable
  work_time          : [ string, string ]
  lunch_break?       : [ string, string ]
}
