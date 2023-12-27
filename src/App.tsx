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

  function handleFormSubmit(ev: FormEvent) {
    ev.preventDefault()
    alert(JSON.stringify(cardData))
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='md:flex md:items-center p-6 md:bg-bgMainDesktop md:h-screen bg-bgMainMobile bg-no-repeat bg-cover'>
        <Card data={cardData} />
      </div>
      <form
        onSubmit={handleFormSubmit}
        className='flex max-w-fit self-center md:mx-auto p-6 flex-col gap-3 font-spaceGrotesk text-darkViolet font-extrabold'
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='cardholder' className='text-sm'>CARDHOLDER NAME</label>
          <input
            type='text'
            id='cardholder'
            placeholder='e.g. Jane Appleseed'
            value={cardData.cardholder}
            onChange={(ev) =>
              setCardData((prev) => ({ ...prev, cardholder: ev.target.value }))
            }
            className='border-darkGryishViolet rounded-md border-[1.5px] p-2 outline-none focus:border-darkViolet'
          />
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
            className='border-darkGryishViolet rounded-md border-[1.5px] p-2 outline-none focus:border-darkViolet'
          />
        </div>
        <div className='flex gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='expMonth' className='text-sm'>EXP. DATE (MM/YY)</label>
            <div className='flex gap-2'>
              <input
                type='text'
                id='expMonth'
                placeholder='MM'
                value={cardData.expMonth}
                onChange={(ev) => {
                  setCardData((prev) => ({
                    ...prev,
                    expMonth: ev.target.value,
                  }))
                }
                }
                maxLength={2}
                className='border-darkGryishViolet max-w-[4.25rem] rounded-md border-[1.5px] p-2 outline-none focus:border-darkViolet'
              />
              <input
                type='text'
                id='expYear'
                placeholder='YY'
                value={cardData.expYear}
                onChange={(ev) =>
                  setCardData((prev) => ({ ...prev, expYear: ev.target.value }))
                }
                maxLength={2}
                className='border-darkGryishViolet max-w-[4.25rem] rounded-md border-[1.5px] p-2 outline-none focus:border-darkViolet'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 self-end'>
            <label htmlFor='cvc' className='text-sm'>CVC</label>
            <input
              type='text'
              id='cvc'
              placeholder='e.g. 123'
              value={cardData.cvc}
              onChange={(ev) =>
                setCardData((prev) => ({ ...prev, cvc: ev.target.value }))
              }
              maxLength={3}
              className='border-darkGryishViolet w-full min-w-[5rem] rounded-md border-[1.5px] p-2 outline-none focus:border-darkViolet'
            />
          </div>
        </div>
        <button
          type='submit'
          className='block rounded-md bg-darkViolet py-2 text-white hover:opacity-95 focus:ring-4 focus:ring-violet-900 focus:ring-opacity-50 transition-all duration-300'
        >
          Confirm
        </button>
      </form>
    </div>
  )
}

export default App
