import { Link } from "react-router-dom"
import { ToCartButton } from "./CartButtonComponent"
import { ToggleCartOverlay } from "../../App"
import CartComponent from "../Cart/CartComponent"
import { useEffect, useReducer } from "react"
import { styled } from "styled-components"

const setCurrentPages = (setPages: Function) => {
  const currentPage = location.pathname
  switch (currentPage) {
    case "/main":
      setPages("", "/sides", "", "Next")
      break
    case "/sides":
      setPages("/main", "/drink", "Back", "Next")
      break
    case "/drink":
      setPages("/sides", "/checkout", "Back", "To checkout")
      break
    case "/checkout":
      setPages("/drink", "", "Back", "")
      break
    default:
      setPages("", "", "", "")
  }
}

type PageNavState = {
  cartVisible: boolean
  prevPage: string
  nextPage: string
  prevButtonText: string
  nextButtonText: string
}

type Action =
  | { type: "TOGGLE_CART" }
  | {
      type: "SET_PAGES"
      payload: {
        prevPage: string
        nextPage: string
        prevButtonText: string
        nextButtonText: string
      }
    }

const reducer = (state: PageNavState, action: Action) => {
  switch (action.type) {
    case "TOGGLE_CART":
      return { ...state, cartVisible: !state.cartVisible }
    case "SET_PAGES":
      return {
        ...state,
        prevPage: action.payload.prevPage,
        nextPage: action.payload.nextPage,
        prevButtonText: action.payload.prevButtonText,
        nextButtonText: action.payload.nextButtonText,
      }
    default:
      return state
  }
}

const initialState = {
  cartVisible: false,
  prevPage: "",
  nextPage: "",
  buttonText: "",
  prevButtonText: "",
  nextButtonText: "",
}

export const NavButtons = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    setCurrentPages(setPages)
  }, [location.pathname])

  const setPages = (prev: string, next: string, prevText: string, nextText: string) => {
    dispatch({
      type: "SET_PAGES",
      payload: {
        prevPage: prev,
        nextPage: next,
        prevButtonText: prevText,
        nextButtonText: nextText,
      },
    })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  return (
    <PageNavWrapper>
      <LeftDiv>
        {!!state.prevPage && (
          <Link to={state.prevPage}>
            <StyledButton>{state.prevButtonText}</StyledButton>
          </Link>
        )}
      </LeftDiv>

      <MiddleDiv>{!!state.nextPage && <StyledButton onClick={toggleCart}>My order</StyledButton>}</MiddleDiv>

      <RightDiv>
        {!!state.nextPage && (
          <Link to={state.nextPage}>
            <StyledButton>{state.nextButtonText}</StyledButton>
          </Link>
        )}
      </RightDiv>

      {state.cartVisible && (
        <>
          <ToggleCartOverlay onClick={toggleCart} />
          <CartComponent CloseClick={toggleCart} />
        </>
      )}
    </PageNavWrapper>
  )
}

const StyledButton = styled.button`
  width: 130px;

  @media (max-width: 549px) {
    width: auto;
  }
`

const LeftDiv = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% / 5 * 2);
  min-width: 120px;
`
const MiddleDiv = styled.div`
  width: calc(100% / 5);
  min-width: 110px;
`
const RightDiv = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% / 5 * 2);
  min-width: 120px;
`

const PageNavWrapper = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  gap: 5px;
  width: 100%;

  button {
    padding: 8px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
`
