import styled, { keyframes } from "styled-components";
import MainImg from "../../assets/design-assets/animationImages/MainImg.png";
import SideImg from "../../assets/design-assets/animationImages/SideImg.png";
import DrinkImg from "../../assets/design-assets/animationImages/DrinkkImg.png";

export const Animation = () => {
  return (
    <AnimationContainer>
      <Image1>
        <img src={MainImg} alt="Main"/>
      </Image1>
      <Image2>
        <img src={SideImg} alt="Side" />
      </Image2>
      <Image3>
        <img src={DrinkImg} alt="Drink" />
      </Image3>
    </AnimationContainer>
  );
};

const bounceAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-1rem);

  }
  50% {
    transform: translateY(0);
  }
`;

const AnimationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center; /* Align items to the top */
  overflow: hidden; /* Ensure animation doesn't overflow the container */
`;

const FallingImage = styled.div`
  animation-duration: 2s; /* Reduce animation duration for quicker animation */
`;

const Image1 = styled(FallingImage)`
  animation-name: ${bounceAnimation};
  animation-delay: 0s; /* No delay for the first image */
`;

const Image2 = styled(FallingImage)`
  animation-name: ${bounceAnimation};
  animation-delay: 0.5s; /* Delay for the second image */
`;

const Image3 = styled(FallingImage)`
  animation-name: ${bounceAnimation};
  animation-delay: 1s; /* Delay for the third image */
`;