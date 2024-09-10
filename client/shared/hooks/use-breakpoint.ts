import { useEffect, useState } from 'react';

export const breakpoints = {
    sm: 375,
    md: 745,
    lg: 1024,
    xl: 1980,
};

const useBreakPoint = () => {
    const [currentBreakpoint, setCurrentBreakpoint] = useState<string | null>(null);

    useEffect(() => {
        const handleResize = () => {
            const breakpoint = Object.keys(breakpoints)
                .reverse()
                .find(key => window.innerWidth >= breakpoints[key as keyof typeof breakpoints]);

            setCurrentBreakpoint(breakpoint || 'sm');
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return currentBreakpoint;
};

export default useBreakPoint;
