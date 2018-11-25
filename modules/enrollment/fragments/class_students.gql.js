const gql = require('graphql-tag')

export const classStudentsQuery = gql`
query{
  atten_v2_class_students_aggregate{
    aggregate{
      count
    }
    nodes{
      ...studentFragment
    }
  }
}
${classStudentFragment}
`

export const classStudentFragment = gql`
fragment studentFragment on atten_v2_class_students{
  first_name
  middle_name
  last_name
  birth_of_date
  status
  code
}
`
