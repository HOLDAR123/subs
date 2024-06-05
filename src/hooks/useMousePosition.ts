import { useState, useEffect, RefObject } from 'react';

type State = {
    x: number,
    y: number,
    isInside: boolean
}

const useMousePosition = (ref: RefObject<HTMLElement>) => {

    const [state, setState] = useState<State>({
        x: 0,
        y: 0,
        isInside: false
    });

    useEffect(() => {

        const element = ref.current;

        const updateMousePosition = (ev: MouseEvent) => {
            if (element) {
                setState({ x: ev.clientX, y: ev.clientY, isInside: true });
            }
        };
      
        const handleMouseLeave = () => {
            setState({...state, isInside: false});
        };

        if (element) {
            element.addEventListener('mousemove', updateMousePosition)
            element.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (element) {
                element.removeEventListener('mousemove', updateMousePosition)
                element.removeEventListener('mouseleave', handleMouseLeave);
            }
        };

    }, [ref]);

    return state;
};

export default useMousePosition;