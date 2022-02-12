import React from "react"

import Article from "../components/Article"
import { useSpring, animated, to } from "react-spring"
import { Button, Container, Typography } from "@mui/material"
import useEventListener from "../components/useEventListener";
import { useGesture } from '@use-gesture/react'

import zemljevid from "/public/images/zemljevid/zemljevid.jpg"

let pos = { x: 0, y: 0 }
let memZoom = 0;
const maxZoom = 5
const minZoom = 0
const deltaZoom = 0.5
const multiplier = 1;
let counter = 0;
let shit = "";
let rect: DomRect | undefined;

const Zemljevid = () => {
    const { x, y, scale, zoom, transformCenter } = useSpring({
        to: {
            scale: 1,
            zoom: memZoom,
            x: pos.x,
            y: pos.y,
            transformCenter: { x: 0, y: 0 },
        },
    })

    const preventDefault = (e: Event) => e.preventDefault()
    useEventListener("gesturestart", preventDefault)
    useEventListener("gesturechange", preventDefault)
    const myRef = React.useRef<HTMLElement>()
    let [text, setText] = React.useState("")

    React.useEffect(() => {
        rect = myRef.current.getBoundingClientRect()
    }, [])

    useGesture({
        onDrag: ({ event, delta: [mx, my] }) => {
            event.preventDefault()
            pos = { x: pos.x + mx * multiplier, y: pos.y + my * multiplier }
            x.set(pos.x)
            y.set(pos.y)
        },
        onWheel: ({ event, delta, last }) => {
            event.preventDefault()
            pos.x -= delta[0]
            x.set(pos.x)

            if (last)
                return

            if (myRef.current) {
                let rect = myRef.current.getBoundingClientRect()
                transformCenter.set({
                    x: event.pageX - rect.x,
                    y: event.pageY - rect.y
                })
            }

            const zoomLevel = zoom.get()
            if (delta[1] > 0) {
                if (zoomLevel > minZoom) {
                    zoom.set(zoomLevel - deltaZoom)
                    memZoom = zoom.get()
                }
            } else if (delta[1] < 0) {
                if (zoomLevel < maxZoom) {
                    zoom.set(zoomLevel + deltaZoom)
                    memZoom = zoom.get()
                }
            }
        },
        onPinch: ({ event, delta: [dx, dy], last }) => {
            if (myRef.current /* && counter == 100 */) {
                transformCenter.set({
                    x: event.pageX - rect.x,
                    y: event.pageY - rect.y
                })
                let test = transformCenter.get().x
                // transformCenter.get().x
                shit += (`${text}${Math.round((test + Number.EPSILON) * 100) / 100}\n`)
                counter = 0;
            }

            counter++

            const dist = (dx * 0.5) + zoom.get()
            if (dist >= minZoom && dist <= maxZoom) {
                zoom.set(dist)
                memZoom = zoom.get()
            }
        },
    }, {
        target: myRef,
        eventOptions: { passive: false }
    })

    return (
        <Article title="Zemljevid">
            <Typography>{text}</Typography>
            <Button onClick={() => setText(shit)}>Test me!</Button>
            <Container fixed sx={{
                overflow: "hidden",
            }}>
                <animated.div
                    ref={myRef}
                    style={{
                        x,
                        y,
                        width: zemljevid.width,
                        height: zemljevid.height,
                        touchAction: "none",
                    }}
                >
                    <animated.img
                        src={zemljevid.src}
                        width={zemljevid.width}
                        height={zemljevid.height}
                        alt="zemljevid"
                        style={{
                            transformOrigin: to([transformCenter], (transformCenter) => `${transformCenter.x}px ${transformCenter.y}px`),
                            scale: to([zoom, scale], (s, z) => s + z),
                        }}
                    />
                </animated.div>
            </Container>
        </Article >
    )
}

export default Zemljevid
