import { Cards } from './cards'
import { Establishments } from './establishments'
import { MainDescription } from './main_description'
import { MainPartViews } from './main_part'

export function LandingViews() {
    return (
        <div className='p-0'>
            <MainPartViews />
            <Cards />
            <MainDescription />
            <Establishments />
        </div>
    )
}
