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
              <p>At BoiPoka, we envision a world where access to books and knowledge is limitless. Our vision is to be a guiding light in the literary world, connecting readers to the endless possibilities of learning and self-discovery.</p>
            </div>
          </div>
          {/*  */}
          <div className="flex gap-16 items-center justify-center my-10">
            <div>
              <BiAtom className="text-3xl  text-success" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Our Mission</h1>
              <p>BoiPoka is committed to empowering readers by offering an extensive collection of books, from all genres and eras. We believe in the transformative power of reading.</p>
            </div>
          </div>
          {/*  */}
          <div className="flex gap-16 items-center justify-center">
            <div>
              <BsFillBriefcaseFill className="text-3xl  text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Our Core Values</h1>
              <p>At BoiPoka celebrates the rich tapestry of voices and perspectives within the world of literature. We are committed to offering books that represent diverse cultures, genres, and authors.</p>
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
