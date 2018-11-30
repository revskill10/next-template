const gql = require('graphql-tag')
const {
  agesFragment,
  agesQuery,
  agesSubscription,
  agesMutation,
  agesKey,
} = require('./ages')

const {
  schoolYearsFragment,
  schoolYearsQuery,
  schoolYearsSubscription,
  schoolYearsKey,
  schoolYearsMutation,
} = require('./school-years')

const {
  classRoomsFragment,
  classRoomsQuery,
  classRoomsSubscription,
  classRoomsMutation,
  classRoomsKey
} = require('./classrooms')

const {
  semestersFragment,
  semestersQuery,
  semestersSubscription,
  semestersMutation,
  semestersKey,
} = require('./semesters')

const {
  termsFragment,
  termsQuery,
  termsSubscription,
  termsMutation,
  termsKey,
} = require('./terms')

const {
  weeksFragment,
  weeksQuery,
  weeksSubscription,
  weeksMutation,
  weeksKey,
} = require('./weeks')

const query = gql`
query {
  ${agesKey} {
    ...agesFragment
  }
  ${schoolYearsKey} {
    ...schoolYearsFragment
  }
  ${classRoomsKey} {
    ...classRoomsFragment
  }
  ${semestersKey} {
    ...semestersFragment
  }
  ${termsKey} {
    ...termsFragment
  }
  ${weeksKey} {
    ...weeksFragment
  }
}
${agesFragment}
${schoolYearsFragment}
${classRoomsFragment}
${semestersFragment}
${termsFragment}
${weeksFragment}
`

const mutation = {
  ...agesMutation,
  ...schoolYearsMutation,
  ...classRoomsMutation,
  ...semestersMutation,
  ...termsMutation,
  ...weeksMutation,
}

const subscription = [
  {
    query: agesQuery,
    subscription: agesSubscription,
    key: agesKey,
  },
  {
    query: schoolYearsQuery,
    subscription: schoolYearsSubscription,
    key: schoolYearsKey,
  },
  {
    query: classRoomsQuery,
    subscription: classRoomsSubscription,
    key: classRoomsKey,
  },
  {
    query: semestersQuery,
    subscription: semestersSubscription,
    key: semestersKey,
  },
  {
    query: termsQuery,
    subscription: termsSubscription,
    key: termsKey,
  },
  {
    query: weeksQuery,
    subscription: weeksSubscription,
    key: weeksKey,
  },
]

module.exports = {
  mutation,
  query,
  subscription,
}