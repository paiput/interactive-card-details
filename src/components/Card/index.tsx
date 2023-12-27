interface CardData {
  cardholder?: string
  cardNumber?: string
  expMonth?: string
  expYear?: string
  cvc?: string
}

function FrontCard({ data }: { data: CardData }) {
  return (
    <div className='relative font-spaceGrotesk text-white max-w-[447px] w-full'>
      <img src='src/assets/images/bg-card-front.png' alt='Card front'></img>
      <div className='absolute top-0 left-0 w-full p-4 sm:p-6'>
        <img src='src/assets/images/card-logo.svg' alt='Card logo' className='w-[20%] max-w-[84px]'></img>
        <div className='w-full'>
          <p className='[font-size:_clamp(0.8em,4vw,1.75em)] tracking-wider'>{data.cardNumber?.replace(/(\d{4})/g, '$1 ') || '0000 0000 0000 0000'}</p>
          <div className='[font-size:_clamp(0.25em,2.5vw,1em)] flex justify-between w-full text-lightGrayishViolet'>
            <p className='uppercase'>{data.cardholder || 'Jane Appleseed'}</p>
            <p>{data.expMonth || '00'}/{data.expYear || '00'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function BackCard({ data }: { data: CardData }) {
  return (
    <div className='relative font-spaceGrotesk text-white max-w-[447px] w-full'>
      <img src='src/assets/images/bg-card-back.png' alt='Card back'></img>
      <span className="absolute top-[44%] left-[80%] [font-size:_clamp(0.35em,3vw,1em)] tracking-wider">{data.cvc || '000'}</span>
    </div>
  )
}

function Card({ data }: { data: CardData }) {
  return (
    <div>
      <div className='ml-20'>
        <BackCard data={data} />
      </div>
      <div className='-mt-[108px] mr-20'>
        <FrontCard data={data} />
      </div>
    </div>
  )
}

export default Card