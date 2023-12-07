
import Lottie from 'react-lottie';
import animationData from '../assets/gnixFnCwzY.json';
const useLottie = () => {
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
      };
      
    return   <Lottie options={lottieOptions} height={200} width={200} />
};

export default useLottie;