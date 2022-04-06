import { useContext, useEffect, useState } from "react"
import { Case, Default, Switch } from "react-if"
import { useMutation } from "react-query"
import reactUseCookie from "react-use-cookie"
import { AppConstants } from "../../../../../domain"
import TableApi from "../../../../../network/api/Table.api"
import { PaymentMethodEnum, SaleEntry } from "../../../../../network/models"
import { PresentationHelper } from "../../../../../utils/helpers"
import { BottomSheet, Center, CircleLoader } from "../../../../components"
import { TableApiContext } from "../../../../wrappers"
import { BillActionEnum, BillTypeEnum, ChosenSaleEntry, useBill } from "../../provider"
import { CheckBillAlert } from "./CheckBill.alert"
import { EnterNameForm } from "./EnterName.form"
import { PeachPaymentsCardForm } from "./PeachPaymentsCard.form"

export interface EnterCardDetailsSheetProps {
  open: boolean
  onClose?: () => void
}

export function EnterCardDetailsSheet({
  open,
  onClose,
}: EnterCardDetailsSheetProps): JSX.Element {

  const [identifier, setIdetifier] = useState<string>()
  const [cardRegId, setCardRegId] = reactUseCookie(AppConstants.regCookieId)
  const { state: bill, dispatch } = useBill()
  const tableApi: TableApi = useContext(TableApiContext)
  const { 
    mutate: initiatePayment,
    data,
    isLoading,
  } = useMutation(tableApi.initiatePayment)

  const amount = bill.totalToPay*(1 + bill.tipPercent/100)

  useEffect(() => {
    if (open && (bill.type === BillTypeEnum.payInFull || identifier != null)) {
      console.log(identifier)
      _handleInitiatePayment()
    }
  }, [open, identifier])

  const _handleInitiatePayment = async (): Promise<void> => {

    const items = bill.unpaidItems.filter((item: ChosenSaleEntry) => item.chosenQuantity > 0)
    items.map((item: ChosenSaleEntry) => {
      item.quantity = item.chosenQuantity
      return item as SaleEntry
    })

    const tip = bill.totalToPay*bill.tipPercent/100
    const regId = bill.paymentMethod !== PaymentMethodEnum.applePay && cardRegId && cardRegId !== ''
      ? cardRegId
      : null
    
    initiatePayment({
      check_id: bill.checkId,
      total: bill.totalToPay + tip,
      tip: tip,
      identifier: identifier ?? 'someone',
      registration_id: regId,
      items: items.length > 0 ? items : null,
    })
  }

  const _handleClose = (): void => {
    setIdetifier(undefined)
    onClose?.()
  }

  const _handleContinue = (): void => {
    dispatch({
      type: BillActionEnum.setRecheckBill,
      recheckBill: false,
    })
  }

  return (
    <BottomSheet
      open={ open }
      onClose={ _handleClose }
      title={ `You are paying: ${PresentationHelper.formatCurrency(amount)}` }>
      <Switch>
        <Case condition={ bill.recheckBill }>
          <CheckBillAlert onClose={ _handleClose } onContinue={ _handleContinue } />
        </Case>
        <Case condition={ bill.type != BillTypeEnum.payInFull && !identifier }>
          <EnterNameForm onSubmit={ setIdetifier } />
        </Case>
        <Case condition={ isLoading && !data }>
          <Center height='256px'>
            <CircleLoader size='48px' />
          </Center>
        </Case>
        <Case condition={ !!data }>
          <PeachPaymentsCardForm
            clientId={ bill.clientId }
            tableId={ bill.tableId }
            checkoutId={ data?.checkout_id ?? '' }
            paymentId={ data?.payment_id ?? '' }
            method={ bill.paymentMethod }  />
        </Case>
        <Default>
          { 'ERROR' }
        </Default>
      </Switch>
    </BottomSheet>
  )
}