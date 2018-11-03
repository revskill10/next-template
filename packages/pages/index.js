import { memo } from 'react'
import AppLayout from 'containers/layouts/app'
import Suspense from 'containers/suspense'

import DndTest from 'components/dnd-test'
import AgTest from 'components/datatables/ag-test'
import UserTest from 'components/auth/user-info'
import TestForm from 'components/forms/test-form'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const IndexPage = () =>
  <AppLayout
    title='Home page'
    description='Simple things'
  >
    <>
    <UserTest />
    <Suspense loadPath={() => import('components/sms/facebook')} />
    <div
      id="grid1"
      className="ag-theme-balham"
      style={{ marginTop: '10px', height: '20rem', width: '100%' }}
    >
      <AgTest />

    </div>
    
    <DndTest />
    <TestForm />
    </>
  </AppLayout>

export default memo(IndexPage)
