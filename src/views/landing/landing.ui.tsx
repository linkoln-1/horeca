import { Cards } from './cards'
import { MainPartViews } from './main_part'

export function LandingViews() {
    return (
        <div className='p-0'>
            <MainPartViews />
            <Cards />
        </div>
    )
}
