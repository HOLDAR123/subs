import { keyframes } from "@emotion/react"
import Reveal, {RevealProps} from "react-awesome-reveal"

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-100px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

function SlideInLeft({ children, ...rest }: RevealProps) {
  return (
    <Reveal {...rest} triggerOnce cascade keyframes={slideInLeft}>
      {children}
    </Reveal>
  )
}

export default SlideInLeft
