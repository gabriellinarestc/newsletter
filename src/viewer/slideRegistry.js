import SlideCover from './slides/SlideCover'
import SlideIndex from './slides/SlideIndex'
import SlideHighlights from './slides/SlideHighlights'
import SlideHackathon from './slides/SlideHackathon'
import SlideCulture from './slides/SlideCulture'
import SlideTacoDouble from './slides/SlideTacoDouble'
import SlideTacoSingle from './slides/SlideTacoSingle'
import SlideWelcome from './slides/SlideWelcome'
import SlideTeamUpdate from './slides/SlideTeamUpdate'
import SlideTimeOff from './slides/SlideTimeOff'
import SlideClosing from './slides/SlideClosing'

const slideRegistry = {
  cover: SlideCover,
  index: SlideIndex,
  highlights: SlideHighlights,
  hackathon: SlideHackathon,
  culture: SlideCulture,
  tacoDouble: SlideTacoDouble,
  tacoSingle: SlideTacoSingle,
  welcome: SlideWelcome,
  teamUpdate: SlideTeamUpdate,
  timeOff: SlideTimeOff,
  closing: SlideClosing,
}

export default slideRegistry
