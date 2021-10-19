

import { gql } from '@apollo/client';

export const GET_QUERY = gql`
query GetChecklists {
    checklists{
         reference,
         dueDate,
         isLaunch,
         isWorkingDay
     
   }
   }
`;
export const BY_REF_QUERY = gql`
query Query($ref: String) {
    findByRef(ref: $ref) {
      reference
      dueDate
      isWorkingDay
      tasks {
        title
        status
      }
    }
  }
`;