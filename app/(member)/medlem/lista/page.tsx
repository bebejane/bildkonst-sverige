'use server'

import { AllApprovedMembersDocument } from '@graphql'
import { apiQuery } from 'next-dato-utils';
import s from './page.module.scss'

export default async function Member() {

  const { allMembers } = await apiQuery<AllApprovedMembersQuery, AllApprovedMembersQueryVariables>(AllApprovedMembersDocument, {
    all: true,
    tags: ['member']
  })

  return (
    <article>
      <table className={s.list}>
        <tbody>
          <tr>
            <th>Organisation</th>
            <th>Organisationsnummer</th>
            <th>Kontaktperson</th>
            <th>E-post</th>
            <th>Faktureringsadress</th>
            <th>Nivå</th>
          </tr>
          {allMembers.map(({ id, organization, contact, email, invoiceAddress, level, organizationNo }) =>
            <tr key={id}>
              <td>{organization}</td>
              <td>{organizationNo}</td>
              <td>{contact}</td>
              <td>{email}</td>
              <td>{invoiceAddress}</td>
              <td>{level.level}</td>
            </tr>
          )}
        </tbody>
      </table>
    </article>
  );
}