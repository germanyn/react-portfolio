import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import i18n from '../i18n'

// jsdom doesn't implement scrolling.
Element.prototype.scrollIntoView = vi.fn()

// …nor <dialog>'s methods: mimic open/close, including the `close` event.
HTMLDialogElement.prototype.showModal = function () {
  this.open = true
}
HTMLDialogElement.prototype.close = function () {
  if (!this.open) return
  this.open = false
  this.dispatchEvent(new Event('close'))
}

beforeEach(async () => {
  await i18n.changeLanguage('en')
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  window.history.replaceState(null, '', '/')
})
