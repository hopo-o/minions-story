import fetchMock from 'fetch-mock'

fetchMock.get(
  // matcher
  // {
  //   url: 'http://mock.com/district',
  //   query: { city_id: '110000' }
  // },
  'http://mock.com/district',

  // response
  [
    {
      "district_id": 23008611,
      "district_name": "昌平",
    },
    {
      "district_id": 23008613,
      "district_name": "朝阳",
    },
    {
      "district_id": 23008614,
      "district_name": "东城",
    },
    {
      "district_id": 23008615,
      "district_name": "大兴",
    },
    {
      "district_id": 23008616,
      "district_name": "房山",
    },
    {
      "district_id": 23008617,
      "district_name": "丰台",
    },
    {
      "district_id": 23008618,
      "district_name": "海淀",
    },
    {
      "district_id": 23008619,
      "district_name": "怀柔",
    },
    {
      "district_id": 23008620,
      "district_name": "门头沟",
    },
    {
      "district_id": 23008621,
      "district_name": "密云",
    },
    {
      "district_id": 23008622,
      "district_name": "平谷",
    },
    {
      "district_id": 23008623,
      "district_name": "石景山",
    },
    {
      "district_id": 23008624,
      "district_name": "顺义",
    },
    {
    "district_id": 23008625,
    "district_name": "通州",
    },
    {
      "district_id": 23008626,
      "district_name": "西城",
    },
    {
      "district_id": 23008628,
      "district_name": "延庆",
    },
    {
      "district_id": 23008629,
      "district_name": "亦庄开发区",
    }
  ],

  // options
  {
    delay: 400
  }
)

// fetchMock.get(
//   // matcher
//   {
//     url: 'http://mock.com/district',
//     query: { city_id: '310000' }
//   },

//   // response
//   [
//     {
//         "district_id":310101,
//         "district_name":"黄浦"
//     },
//     {
//         "district_id":310104,
//         "district_name":"徐汇"
//     },
//     {
//         "district_id":310105,
//         "district_name":"长宁"
//     },
//     {
//         "district_id":310106,
//         "district_name":"静安"
//     },
//     {
//         "district_id":310107,
//         "district_name":"普陀"
//     },
//     {
//         "district_id":310109,
//         "district_name":"虹口"
//     },
//     {
//         "district_id":310110,
//         "district_name":"杨浦"
//     },
//     {
//         "district_id":310112,
//         "district_name":"闵行"
//     },
//     {
//         "district_id":310113,
//         "district_name":"宝山"
//     },
//     {
//         "district_id":310114,
//         "district_name":"嘉定"
//     },
//     {
//         "district_id":310115,
//         "district_name":"浦东"
//     },
//     {
//         "district_id":310116,
//         "district_name":"金山"
//     },
//     {
//         "district_id":310117,
//         "district_name":"松江"
//     },
//     {
//         "district_id":310118,
//         "district_name":"青浦"
//     },
//     {
//         "district_id":310120,
//         "district_name":"奉贤"
//     },
//     {
//         "district_id":310230,
//         "district_name":"崇明"
//     },
//     {
//         "district_id":310333,
//         "district_name":"上海周边"
//     },
//     {
//         "district_id":23009002,
//         "district_name":"海外"
//     }
//   ],

//   // options
//   {
//     delay: 400
//   }
// )

fetchMock.get(
  // matcher
  'http://mock.com/bizcircle',

  // response
  [
    {
        "bizcircle_id":611100128,
        "bizcircle_name":"徐汇滨江"
    },
    {
        "bizcircle_id":611100124,
        "bizcircle_name":"华泾"
    },
    {
        "bizcircle_id":611900104,
        "bizcircle_name":"华东理工"
    },
    {
        "bizcircle_id":613000345,
        "bizcircle_name":"徐家汇"
    },
    {
        "bizcircle_id":611100125,
        "bizcircle_name":"龙华"
    },
    {
        "bizcircle_id":613000344,
        "bizcircle_name":"上海南站"
    },
    {
        "bizcircle_id":611100127,
        "bizcircle_name":"田林"
    },
    {
        "bizcircle_id":611900097,
        "bizcircle_name":"衡山路"
    },
    {
        "bizcircle_id":611900098,
        "bizcircle_name":"斜土路"
    },
    {
        "bizcircle_id":611900099,
        "bizcircle_name":"建国西路"
    },
    {
        "bizcircle_id":611900100,
        "bizcircle_name":"万体馆"
    },
    {
        "bizcircle_id":611900102,
        "bizcircle_name":"植物园"
    },
    {
        "bizcircle_id":613000343,
        "bizcircle_name":"康健"
    },
    {
        "bizcircle_id":611900103,
        "bizcircle_name":"长桥"
    },
    {
        "bizcircle_id":613000342,
        "bizcircle_name":"漕河泾"
    }
],

  // options
  {
    delay: 400
  }
)