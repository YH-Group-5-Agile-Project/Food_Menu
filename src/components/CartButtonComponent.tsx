
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const ToCartButton = () => {

  return (
    <>
      <Link to="/order"><button>My order</button></Link>
    </>
  );
};
