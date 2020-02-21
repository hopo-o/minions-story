// 等级
export const levelsOptions = [
  {
    value: 3,
    label: '高'
  },
  {
    value: 2,
    label: '中'
  },
  {
    value: 1,
    label: '低'
  }
]

// 状态
export const statusOptions = [
  {
    value: 1,
    label: '待提交'
  },
  {
    value: 2,
    label: '待审核'
  },
  {
    value: 3,
    label: '审核不通过'
  },
  {
    value: 4,
    label: '上线'
  },
  {
    value: 5,
    label: '下线'
  }
]

// 审核状态
// 0未审核，1审核通过，2审核驳回
export const approvalStatus = [
  {
    value: 0,
    label: '待审核'
  },
  {
    value: 1,
    label: '审核通过'
  },
  {
    value: 2,
    label: '审核驳回'
  }
]

export const timeoutStatus = [
  {
    value: 0,
    label: '未超时'
  },
  {
    value: 1,
    label: '已超时'
  }
]
