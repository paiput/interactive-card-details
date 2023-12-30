import { useState, FormEvent } from 'react'
import './index.css'
import Card from './components/Card'

const INITAL_CARD_DATA = {
  cardholder: '',
  cardNumber: '',
  expMonth: '',
  expYear: '',
  cvc: '',
}

function App() {
  const [cardData, setCardData] = useState(INITAL_CARD_DATA)
  const [invalidInputs, setInvalidInputs] = useState<{ [k: string]: string | null }>({
    cardholder: null,
    cardNumber: null,
    expMonth: null,
    expYear: null,
    cvc: null
  })
  const [isLoading, setIsLoading] = useState(false)

  function handleFormSubmit(ev: FormEvent) {
    let err = false
    ev.preventDefault()
    Object.entries(cardData).forEach(([key, val]) => {
      setInvalidInputs(prev => ({ ...prev, [key]: val.length === 0 ? "Can't be blank" : null }))
      if (val.length === 0) err = true
    })
    if (cardData.cardNumber.length !== 16) {
      err = true
      setInvalidInputs(prev => ({ ...prev, cardNumber: "Must be 16 digits" }))
    }
    if (cardData.cvc.length !== 3) {
      err = true
      setInvalidInputs(prev => ({ ...prev, cvc: "Must be 3 digits" }))
    }
    if (parseInt(cardData.expMonth) < 1 || parseInt(cardData.expMonth) > 12) {
      setInvalidInputs(prev => ({ ...prev, expMonth: "Invalid month" }))
      err = true
    }
    if (parseInt(cardData.expYear) < new Date().getFullYear() % 100) {
      setInvalidInputs(prev => ({ ...prev, expYear: "Invalid year" }))
      err = true
    }
    if (err) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      localStorage.setItem('cardDetails', JSON.stringify(cardData))
    }, 3000);
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='mb-24 md:mb-0 md:flex md:items-center p-12 md:p-6 md:bg-bgMainDesktop md:h-screen bg-bgMainMobile bg-no-repeat bg-cover lg:max-w-md'>
        <div className='flex justify-center mx-auto lg:translate-x-[50%]'>
          <Card data={cardData} />
        </div>
      </div>
      {isLoading ? (
        <div className='mx-auto self-center'><div className='w-16 h-16 border-8 border-darkViolet rounded-full border-t-transparent animate-spin' /></div>
      ) : localStorage.getItem('cardDetails') !== null ? (
        <div className='font-spaceGrotesk w-full p-8 self-center mx-auto max-w-xs flex flex-col items-center gap-8'>
          <img src='./src/assets/images/icon-complete.svg' alt='Icon complete' />
          <div className='text-center'>
            <h3 className='text-darkViolet text-2xl mb-2'>THANK YOU!</h3>
            <p className='text-darkGrayishViolet'>We've added your card details</p>
          </div>
          <button
            className='block w-full rounded-md bg-darkViolet py-2 text-white hover:drop-shadow-xl hover:shadow-violet-900 focus:ring-4 focus:ring-violet-900 focus:ring-opacity-50 transition-all duration-300'
            onClick={() => {
              localStorage.removeItem('cardDetails')
              location.reload()
            }
            }
          >
            Continue
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className='flex max-w-[400px] self-center md:mx-auto p-6 flex-col gap-3 font-spaceGrotesk text-darkViolet font-extrabold'
        >
          <div className='flex flex-col gap-2'>
            <label htmlFor='cardholder' className='text-sm'>CARDHOLDER NAME</label>
            <input
              type='text'
              id='cardholder'
              placeholder='e.g. Jane Appleseed'
              value={cardData.cardholder}
              onChange={(ev) => {
                setCardData((prev) => ({ ...prev, cardholder: ev.target.value }))
              }
              }
              className={`border-darkGryishViolet rounded-md border-[1.5px] p-2 outline-none focus:border-darkViolet ${invalidInputs.cardholder && 'border-red-500'}`}
            />
            {invalidInputs.cardholder && <span className='text-xs text-red-500'>{invalidInputs.cardholder}</span>}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='cardnumber' className='text-sm'>CARD NUMBER</label>
            <input
              type='text'
              id='cardnumber'
              placeholder='e.g. 1234 5678 9123 0000'
              value={cardData.cardNumber}
              onChange={(ev) => {
                // Remove non-numeric characters from the input
                const inputNumber = ev.target.value.replace(/\D|[\b]/g, '')
                setCardData((prev) => ({ ...prev, cardNumber: inputNumber }))
              }}
              maxLength={16}
              className={`border-darkGryishViolet rounded-md border-[1.5px] p-2 outline-none focus:border-darkViolet ${invalidInputs.cardNumber && 'border-red-500'}`}
            />
            {invalidInputs.cardNumber && <span className='text-xs text-red-500'>{invalidInputs.cardNumber}</span>}
          </div>
          <div className='flex gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='expMonth' className='text-sm'>EXP. DATE (MM/YY)</label>
              <div className='flex gap-2'>
                <div className='flex flex-col gap-2'>
                  <input
                    type='text'
                    id='expMonth'
                    placeholder='MM'
                    value={cardData.expMonth}
                    onChange={(ev) => {
                      const inputNumber = ev.target.value.replace(/\D|[\b]/g, '')
                      setCardData((prev) => ({
                        ...prev,
                        expMonth: inputNumber,
                      }))
                    }
                    }
                    maxLength={2}
                    className={`border-darkGryishViolet max-w-[4.25rem] rounded-md border-[1.5px] p-2 outline-none focus:border-darkViolet ${invalidInputs.expMonth && 'border-red-500'}`}
                  />
                  {invalidInputs.expMonth && <span className='text-xs text-red-500'>{invalidInputs.expMonth}</span>}
                </div>
                <div className='flex flex-col gap-2'>
                  <input
                    type='text'
                    id='expYear'
                    placeholder='YY'
                    value={cardData.expYear}
                    onChange={(ev) => {
                      const inputNumber = ev.target.value.replace(/\D|[\b]/g, '')
                      setCardData((prev) => ({ ...prev, expYear: inputNumber }))
                    }
                    }
                    maxLength={2}
                    className={`border-darkGryishViolet max-w-[4.25rem] rounded-md border-[1.5px] p-2 outline-none focus:border-darkViolet ${invalidInputs.expYear && 'border-red-500'}`}
                  />
                  {invalidInputs.expYear && <span className='text-xs block text-red-500'>{invalidInputs.expYear}</span>}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='cvc' className='text-sm'>CVC</label>
              <input
                type='text'
                id='cvc'
                placeholder='e.g. 123'
                value={cardData.cvc}
                onChange={(ev) => {
                  const inputNumber = ev.target.value.replace(/\D|[\b]/g, '')
                  setCardData((prev) => ({ ...prev, cvc: inputNumber }))
                }
                }
                maxLength={3}
                className={`border-darkGryishViolet w-full min-w-[5rem] rounded-md border-[1.5px] p-2 outline-none focus:border-darkViolet ${invalidInputs.cvc && 'border-red-500'}`}
              />
              {invalidInputs.cvc && <span className='text-xs text-red-500'>{invalidInputs.cvc}</span>}
            </div>
          </div>
          <button
            type='submit'
            className='block rounded-md bg-darkViolet py-2 text-white hover:drop-shadow-xl hover:shadow-violet-900 focus:ring-4 focus:ring-violet-900 focus:ring-opacity-50 transition-all duration-300'
          >
            Confirm
          </button>
        </form>
      )}
    </div>
  )
}

export default App
