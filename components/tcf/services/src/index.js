import {memo, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {ServiceInitializer} from './infrastructure/bootstrap/ServiceInitializer'
import ConsentContext from './context'
import useConsent from './context/useConsent'
import {eventReporterFactory} from './infrastructure/reporter/eventReporter'
import {TCF_CONTEXT_INITIALIZED} from './core/events'

function ConsentProvider({language, isMobile, reporter, scope, children}) {
  const eventReporter = useRef()
  eventReporter.current =
    eventReporter.current || eventReporterFactory(reporter)
  const service = useRef()
  service.current =
    service.current ||
    ServiceInitializer.init({language, reporter: eventReporter.current, scope})

  const loadConsentDraft = () => service.current.loadConsentDraft()
  const loadUserConsent = () => service.current.loadUserConsent()
  const getVendorList = () => service.current.getVendorList()
  const getScope = () =>
    Promise.resolve().then(
      () =>
        scope ||
        getVendorList().then(vendorList => ({
          purposes: Object.keys(vendorList.purposes),
          specialFeatures: Object.keys(vendorList.specialFeatures)
        }))
    )
  const saveUserConsent = () => service.current.saveUserConsent()
  const saveFullUserConsent = () => service.current.saveFullUserConsent()
  const updatePurpose = ({id, consent}) =>
    service.current.updatePurpose({id, consent})
  const updateSpecialFeature = ({id, consent}) =>
    service.current.updateSpecialFeature({id, consent})
  const updateVendor = ({id, consent, legitimateInterest}) =>
    service.current.updateVendor({id, consent, legitimateInterest})
  const uiVisible = ({visible}) => service.current.uiVisible({visible})

  useEffect(() => {
    eventReporter.current(TCF_CONTEXT_INITIALIZED, {language, isMobile})
  })
  return (
    <ConsentContext.Provider
      value={{
        getScope,
        getVendorList,
        isMobile,
        language,
        loadConsentDraft,
        loadUserConsent,
        reporter: eventReporter.current,
        saveFullUserConsent,
        saveUserConsent,
        uiVisible,
        updatePurpose,
        updateSpecialFeature,
        updateVendor
      }}
    >
      {children}
    </ConsentContext.Provider>
  )
}

export default memo(ConsentProvider)
export {useConsent}

ConsentProvider.displayName = 'ConsentProvider'
ConsentProvider.propTypes = {
  children: PropTypes.any.isRequired,
  isMobile: PropTypes.bool,
  language: PropTypes.string,
  reporter: PropTypes.func,
  scope: PropTypes.object
}
