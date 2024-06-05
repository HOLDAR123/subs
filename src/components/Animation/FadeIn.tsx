import {keyframes} from "@emotion/react"
import Reveal, {RevealProps} from "react-awesome-reveal"
import React from "react"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

function FadeIn({children, ...rest}: RevealProps) {
    return (
        <Reveal {...rest} triggerOnce keyframes={fadeIn}>
            {children}
        </Reveal>
    )
}

export default FadeIn
