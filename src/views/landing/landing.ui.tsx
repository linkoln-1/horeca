import { Cards } from './cards'
import { MainDescription } from './main_description'
import { MainPartViews } from './main_part'

export function LandingViews() {
    return (
        <div className='p-0'>
            <MainPartViews />
            <Cards />
            <MainDescription />
        </div>
    )
}
