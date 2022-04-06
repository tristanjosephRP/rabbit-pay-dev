import { Router } from "../navigation/Router"
import { AppContainer } from "./components"
import { ApiWrapper, ServicesWrapper } from "./wrappers"

export default function RabbitPayApp() {

  return (
    <ServicesWrapper>
      <ApiWrapper>
        <AppContainer>
          <Router />
        </AppContainer>
      </ApiWrapper>
    </ServicesWrapper>
  )
}
