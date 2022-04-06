import { Route, Routes as DomRouter } from 'react-router-dom'
import { PreviewBillPage, SettleBillPage, NotFoundPage, ReviewReceiptPage, CheckSummaryPage } from '../presentation/pages'

export function Router(): JSX.Element {

  return (
    <DomRouter>
      <Route
        path='/client/:client_id/table/:table_id'
        element={ <PreviewBillPage /> } />
      <Route
        path='/client/:client_id/table/:table_id/bill'
        element={ <SettleBillPage /> } />
      <Route
        path='/client/:client_id/table/:table_id/payment/:payment_id/status'
        element={ <ReviewReceiptPage /> } />
      <Route
        path='/client/:client_id/table/:table_id/check/:check_id'
        element={ <CheckSummaryPage /> } />
      <Route
        path='*'
        element={ <NotFoundPage /> } />
    </DomRouter>
  )
}
