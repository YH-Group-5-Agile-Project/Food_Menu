import { useEffect } from "react"
import { MatrixRain } from "./MatrixRain"
import { styled } from "styled-components"
import anonymous from "../../assets/anonymous.png"

const TextSignFunction = ({ spans }: { spans: string[] }) => {
  let randomString = document.querySelectorAll(".str")
  let data = 0
  let timer = 40

  const rollNumbers = () => {
    randomString.forEach((span) => {
      const change = Math.round(Math.random() * 100)
      span.setAttribute("data-change", change.toString())
    })
  }

  const random = () => {
    return Math.round(Math.random() * 9)
  }

  const select = () => {
    return Math.round(Math.random() * randomString.length)
  }

  const value = () => {
    let selectedIndex = select()
    if (selectedIndex >= 0 && selectedIndex < randomString.length) {
      randomString[selectedIndex].innerHTML = random().toString()
      randomString[selectedIndex].setAttribute("data-number", data.toString())
      data++
    }

    randomString.forEach((span) => {
      let dataNumber = span.getAttribute("data-number")
      let dataChange = span.getAttribute("data-change")
      if (!dataNumber || !dataChange) return
      if (parseInt(dataNumber) > parseInt(dataChange)) {
        const index = Array.from(randomString).indexOf(span)
        if (index >= 0 && index < spans.length) {
          span.innerHTML = spans[index]
        }
      }
    })
  }

  rollNumbers()
  setInterval(value, timer)
}

export const TextBox = () => {
  // let spans = ["T", "h", "a", "n", "k", " ", "Y", "o", "u", " ", "F", "o", "r", " ", "P", "a", "y", "i", "n", "g", " ", "W", "i", "t", "h", " ", "O", "u", "r", " ", "A", "p", "p"]
  // let spans = ["Y", "o", "u", " ", "A", "r", "e", " ", "H", "a", "c", "k", "e", "d"]
  let spans = ["Y", "o", "u", "'", "v", "e", " ", "B", "e", "e", "n", " ", "H", "a", "c", "k", "e", "d"]

  useEffect(() => {
    TextSignFunction({ spans })
  }, [])

  return (
    <>
      <Mask>
        <img src={anonymous} />
      </Mask>
      <MatrixRain />
      <Content>
        <Random>
          {spans.map(() => (
            <span className="ltr str">0</span>
          ))}
        </Random>
      </Content>
    </>
  )
}

const Content = styled.div`
  max-width: 1500px;
  display: table;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  color: #0f0;
  font-family: IBM Plex Sans;
`
const Random = styled.div`
  max-width: 1500px;
  margin: auto;
  border: 2px solid;
  padding: 15px;

  span {
    width: 30px;
    display: inline-block;
  }
`

const Mask = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(50% - (800px / 2));
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    filter: opacity(0.6) brightness(0.1);
    width: 100%;
    max-width: 680px;
    margin: auto;
  }
`
