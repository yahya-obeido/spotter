import { useState } from 'react'
import IconInputBox, { type IconInputBoxProps } from '../IconInputBox'
import IconInputGridList, { type IconInputGridSection } from '../IconInputGridList'

type LocationState = {
  streetAddress: string
  city: string
  state: string
  zipCode: string
}

type FormState = {
  current: LocationState
  pickup: LocationState
  dropoff: LocationState
}

type ApiResponse = {
  html?: string
  imageUrl?: string
}

type InputSectionProps = {
  onSuccess?: (response: ApiResponse) => void
}

const INITIAL_LOCATION: LocationState = {
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
}

const INITIAL_FORM_STATE: FormState = {
  current: { ...INITIAL_LOCATION },
  pickup: { ...INITIAL_LOCATION },
  dropoff: { ...INITIAL_LOCATION },
}

function InputSection({ onSuccess }: InputSectionProps) {
  const [currentCycleHours, setCurrentCycleHours] = useState('')
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleFieldChange =
    (location: keyof FormState, field: keyof LocationState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({
        ...prev,
        [location]: { ...prev[location], [field]: e.target.value },
      }))
    }

  const handleCycleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setCurrentCycleHours('')
      return
    }

    const numericValue = Number(value)
    if (!Number.isNaN(numericValue) && numericValue >= 1 && numericValue <= 70) {
      setCurrentCycleHours(value)
    }
  }

  const createGridInputs = (location: keyof FormState): IconInputBoxProps[] => [
    {
      iconType: 'road',
      placeholder: 'Street Address',
      value: formState[location].streetAddress,
      onChange: handleFieldChange(location, 'streetAddress'),
    },
    {
      iconType: 'house',
      placeholder: 'City',
      value: formState[location].city,
      onChange: handleFieldChange(location, 'city'),
    },
    {
      iconType: 'car',
      placeholder: 'State',
      value: formState[location].state,
      onChange: handleFieldChange(location, 'state'),
    },
    {
      iconType: 'user',
      placeholder: 'Zip Code',
      value: formState[location].zipCode,
      onChange: handleFieldChange(location, 'zipCode'),
    },
  ]

  const inputGrids: IconInputGridSection[] = [
    { title: 'Current Location', inputs: createGridInputs('current') },
    { title: 'Pickup Location', inputs: createGridInputs('pickup') },
    { title: 'Dropoff Location', inputs: createGridInputs('dropoff') },
  ]

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          currentCycleHours,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit data. Please try again.')
      }

      const data: ApiResponse = await response.json()
      onSuccess?.(data)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred.'
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="cycle-input-section">
        <h2 className="cycle-input-title">Current Cycle used (Hrs)</h2>
        <IconInputBox
          iconType="clock"
          placeholder="Enter hours..."
          value={currentCycleHours}
          onChange={handleCycleHoursChange}
          inputProps={{
            type: 'number',
            min: 1,
            max: 70,
            step: 1,
            inputMode: 'numeric',
          }}
        />
      </section>
      <IconInputGridList grids={inputGrids} />
      <div className="submit-container">
        <button
          type="button"
          className="submit-button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit to API'}
        </button>
        {submitError && <p className="submit-error">{submitError}</p>}
      </div>
    </>
  )
}

export default InputSection

