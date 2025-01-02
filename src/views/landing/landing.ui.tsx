import { Cards } from './cards'
import { Establishments } from './establishments'
import { MainDescription } from './main_description'
import { MainPartViews } from './main_part'
import { Provider } from './provider'
import { StartBlock } from './start_block/start_block'
import { Stats } from './stats'
import { Steps } from './steps'
import { VideoBlock } from './video_block'

export function LandingViews() {
    return (
        <div className='p-0'>
            <MainPartViews />
            <Cards />
            <MainDescription />
            <Establishments />
            <Provider />
            <Steps />
            <Stats />
            <VideoBlock />
            <StartBlock />
        </div>
    )
}
