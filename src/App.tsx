"use client";
import { useEffect, useState } from "react";

export function App() {
    const [alpha, setAlpha] = useState<number>(0);

    useEffect(() => {
        const handleOrientationEvent = (event: DeviceOrientationEvent) => {
            if (event.alpha !== null) {
                setAlpha(event.alpha);
            }
        };

        return () => {
            window.removeEventListener("deviceorientation", handleOrientationEvent);
        };
    }, []);

    return (
        <div>
            <h1>Alpha:{alpha}</h1>
        </div>
    );
}

export default App;
