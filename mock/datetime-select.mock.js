import fetchMock from 'fetch-mock'

fetchMock.get(
  // matcher
  'http://mock.com/freetime',

  // response
  {
    "city_id":110000,
    "has_cameraman":1,
    "work_time":[
        "09:00",
        "18:30"
    ],
    "lunch_break":[
        "12:30",
        "12:30"
    ],
    "buffer_minutes":60,
    "date":"20200121",
    "forenoon_available":1,
    "afternoon_available":1,
    "duration_minutes":75
  },

  // options
  {
    delay: 400
  }
)