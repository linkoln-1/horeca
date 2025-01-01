import { Cards } from './cards'
import { Establishments } from './establishments'
import { MainDescription } from './main_description'
import { MainPartViews } from './main_part'
import { Provider } from './provider'
import { Steps } from './steps'

export function LandingViews() {
    return (
        <div className='p-0'>
            <MainPartViews />
            <Cards />
            <MainDescription />
            <Establishments />
            <Provider />
            <Steps />
        </div>
    )
}
