import { useEffect, useRef } from "react"

const MatrixAnimation = ({ canvas }: { canvas: React.RefObject<HTMLCanvasElement> }) => {
  if (!canvas.current) return

  let ctx = canvas.current.getContext("2d")
  let w = (canvas.current.width = window.innerWidth)
  let h = (canvas.current.height = window.innerHeight)
  let yPosition = Array(300).fill(0)
  let gameInterval: number

  const runMatrix = () => {
    if (typeof gameInterval !== "undefined") clearInterval(gameInterval)
    gameInterval = setInterval(drawScreen, 33)
  }

  const drawScreen = () => {
    if (!ctx) return

    ctx.fillStyle = "rgba(0, 0, 0, .06"
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = "#0f0"
    ctx.font = "15px IBM Plex Sans"
    yPosition.forEach((y, index) => {
      let text = String.fromCharCode(1e2 + Math.random() * 33)
      let x = index * 10 + 10
      ctx.fillText(text, x, +y)
      if (y > 100 + Math.random() * 1e4) {
        yPosition[index] = 0
      } else {
        yPosition[index] = y + 10
      }
    })
  }

  runMatrix()
}

export const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    MatrixAnimation({ canvas: canvasRef })
  }, [])

  return <canvas ref={canvasRef} />
}
