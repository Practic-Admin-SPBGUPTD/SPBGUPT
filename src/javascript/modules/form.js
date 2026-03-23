export function initLeadForm() {
  const form = document.querySelector('form.formseco[action="/api/lead"]')
  if (!form) return

  const modalText = 'Спасибо! Заявка отправлена. Мы скоро свяжемся с вами.'

  function showModal(text) {
    let overlay = document.getElementById('lead-modal-overlay')
    if (!overlay) {
      overlay = document.createElement('div')
      overlay.id = 'lead-modal-overlay'
      overlay.className = 'lead-modal-overlay'
      overlay.innerHTML = `
        <div class="lead-modal-box" role="dialog" aria-modal="true">
          <div class="lead-modal-title">Сообщение отправлено</div>
          <div class="lead-modal-message"></div>
          <button type="button" class="lead-modal-button">Ок</button>
        </div>
      `
      document.body.appendChild(overlay)

      overlay.querySelector('.lead-modal-button').addEventListener('click', () => {
        overlay.style.display = 'none'
      })
    }

    overlay.querySelector('.lead-modal-message').textContent = text
    overlay.style.display = 'flex'
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const submitBtn = form.querySelector('button[type="submit"]')
    if (submitBtn) submitBtn.disabled = true

    try {
      const formData = new FormData(form)

      // Ensure consent checkbox is included even if the browser doesn't add it
      const checkbox = form.querySelector('input[type="checkbox"][name="checkbox"]')
      if (checkbox && checkbox.checked) {
        formData.set('checkbox', checkbox.value || '1')
      }

      const payload = new URLSearchParams(formData)

      const resp = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: payload.toString(),
      })

      // Backend returns 200 with success text; don't navigate away
      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status}`)
      }

      showModal(modalText)
      form.reset()
    } catch (err) {
      console.error('Lead submit failed:', err)
      showModal('Произошла ошибка. Попробуйте ещё раз позже.')
    } finally {
      if (submitBtn) submitBtn.disabled = false
    }
  })
}

