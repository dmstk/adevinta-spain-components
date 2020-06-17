import {Service} from '../../application/Service'
import {
  saveUserConsentUseCaseFactory,
  loadUserConsentUseCaseFactory,
  getVendorListUseCaseFactory
} from '../../application/service/factory'
import {tcfRepositoryFactory} from '../Tcf/factory'

class ServiceInitializer {
  static init() {
    const tcfRepository = tcfRepositoryFactory()
    const saveUserConsentUseCase = saveUserConsentUseCaseFactory({
      repository: tcfRepository
    })
    const loadUserConsentUseCase = loadUserConsentUseCaseFactory({
      repository: tcfRepository
    })
    const getVendorListUseCase = getVendorListUseCaseFactory({
      repository: tcfRepository
    })
    return new Service({
      saveUserConsentUseCase,
      loadUserConsentUseCase,
      getVendorListUseCase
    })
  }
}

export {ServiceInitializer}
