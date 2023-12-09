import { BsFillBarChartFill } from 'react-icons/bs';
import { BiAtom } from 'react-icons/bi';
import { BsFillBriefcaseFill } from 'react-icons/bs';

import contact from '../../../../assets/pets.jpg';
import aboutus from '../../../../assets/aboutus.jpg';

const AboutUs = () => {
  return (
    <div className="relative mt-20 " style={{ backgroundImage: `url(${contact})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-black opacity-70" />

      <div className="relative z-10 text-white py-16">
        <div className="flex flex-col items-center justify-center mt-20 mb-20" id="services">
          <h3 className="text-[#ff0000]">Know about us</h3>
          <h1 className="text-white text-2xl md:text-4xl font-metamorphous font-bold text-center">__About Us__</h1>
        </div>
        <div className='flex items-center justify-center '>
        <div className="px-10 py-10 w-full lg:max-w-[1200px] mx-auto">
          <div className="flex gap-16 items-center justify-center">
            <div>
              <BsFillBarChartFill className="text-3xl text-warning" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Our Vision</h1>
              <p>At Four Pows, we dream of a world where the echoes of happy barks and content purrs fill every home. Our vision is to be the heartbeat of pet adoption, fostering connections that bring joy, companionship, and a forever home to every creature with four paws.</p>
            </div>
          </div>
          {/*  */}
          <div className="flex gap-16 items-center justify-center my-10">
            <div>
              <BiAtom className="text-3xl  text-success" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Our Mission</h1>
              <p>Four Pows is on a heartfelt mission to rewrite the stories of countless furry companions, guiding them towards a brighter chapter filled with love and belonging. We're committed to not just facilitating adoptions but also nurturing a community where the journey of pet companionship is celebrated and supported every step of the way.</p>
            </div>
          </div>
          {/*  */}
          <div className="flex gap-16 items-center justify-center">
            <div>
              <BsFillBriefcaseFill className="text-3xl  text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Our Core Values</h1>
              <p>Four Pows values the diversity in every wag, meow, and chirp, recognizing the unique charm each pet brings. Our core values revolve around inclusivity, compassion, and the belief that every pet, regardless of their past, deserves a warm, loving embrace. We are dedicated to upholding the principles of responsible pet ownership, ensuring that the Four Pows community is a sanctuary of unconditional love and lifelong connections...</p>
            </div>
          </div>
        </div>
            <div>
<img src={aboutus} alt="" className=' w-9/12 rounded-lg hidden lg:flex' />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
