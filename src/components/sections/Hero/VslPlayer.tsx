'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';

type VslPlayerProps = {
    src: string,
    title: string
}

// Browsers only allow autoplay WITH sound after the visitor has clicked/tapped on the site.
// So: try with sound first; if the browser refuses, start muted and unmute on the first click/tap/key anywhere.
const VslPlayer: FC<VslPlayerProps> = ({ src, title }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(false);

    const unmute = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = false;
        video.volume = 1;
        setIsMuted(false);
        if (video.paused) void video.play().catch(() => undefined);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let cancelled = false;

        const start = async () => {
            try {
                video.muted = false;
                await video.play();
            } catch {
                // Autoplay with sound was blocked: play muted instead
                if (cancelled) return;
                video.muted = true;
                setIsMuted(true);
                await video.play().catch(() => undefined);
            }
        };
        void start();

        return () => {
            cancelled = true;
        };
    }, [src]);

    // While muted, the first real interaction anywhere on the page turns the sound on
    useEffect(() => {
        if (!isMuted) return;
        const events = ['pointerdown', 'keydown', 'touchend'] as const;
        const handler = () => unmute();
        events.forEach((name) => document.addEventListener(name, handler, { once: true }));
        return () => events.forEach((name) => document.removeEventListener(name, handler));
    }, [isMuted, unmute]);

    return (
        <div className="relative h-full w-full">
            <video
                ref={videoRef}
                src={src}
                title={title}
                controls
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                playsInline
                preload="auto"
                onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
                className="h-full w-full border-0"
            />

            {isMuted && (
                <button
                    type="button"
                    onClick={unmute}
                    className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/75 px-3.5 py-2 text-xs font-black text-white shadow-lg backdrop-blur transition hover:bg-black/90"
                >
                    <span aria-hidden="true">🔇</span>
                    Tap to unmute
                </button>
            )}
        </div>
    );
};

export default VslPlayer;
