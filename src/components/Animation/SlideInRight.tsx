import { keyframes } from "@emotion/react"
import Reveal, {RevealProps} from "react-awesome-reveal"

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translate3d(100px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

function SlideInRight({ children, ...rest }: RevealProps) {
  return (
    <Reveal {...rest} triggerOnce cascade keyframes={slideInRight}>
      {children}
    </Reveal>
  )
}

export default SlideInRight
