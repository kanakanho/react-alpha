"use client";
import { useEffect, useState } from "react";

export function App() {
    const [alpha, setAlpha] = useState<number>(0);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        const handleOrientationEvent = (event: DeviceOrientationEvent) => {
            if (event.alpha !== null) {
                setAlpha(event.alpha);
            }
        };

        if (permissionGranted) {
            window.addEventListener("deviceorientation", handleOrientationEvent);
        }

        return () => {
            window.removeEventListener("deviceorientation", handleOrientationEvent);
        };
    }, [permissionGranted]);

    return (
        <div>
            <button
                onClick={() => {
                    const deviceOrientationEvent = DeviceOrientationEvent as any;
                    if (typeof deviceOrientationEvent.requestPermission === "function") {
                        deviceOrientationEvent.requestPermission().then((response: string) => {
                            if (response === "granted") {
                                setPermissionGranted(true);
                            } else {
                                console.error("Permission not granted for Device Orientation");
                            }
                        });
                    } else {
                        setPermissionGranted(true); // Androidや非iOSデバイスの場合
                    }
                }}
            >
                Request permission
            </button>
            <h1>Alpha:{alpha}</h1>
        </div>
    );
}

export default App;
