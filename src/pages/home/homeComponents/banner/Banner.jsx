
          // import Swiper core and required modules
          import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

          import { Swiper, SwiperSlide } from 'swiper/react';
          import ban2 from '../../../../assets/banner1.jpg'
          import ban3 from '../../../../assets/banner2.jpg'
          import ban4 from '../../../../assets/banner-4.jpg'
        
          
          // Import Swiper styles
          import 'swiper/css';
          import 'swiper/css/navigation';
          import 'swiper/css/pagination';
          import 'swiper/css/scrollbar';
const Banner = () => {
    return (
        <div>
      <Swiper
        // Install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        // navigation
        autoplay={true}
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          {/* <img src={banner3} alt="" style={{ width: '100%', height: '90vh' }} /> */}
          <div className="hero min-h-screen bg-[#FFF4D6]">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={ban2} className="w-6/12 rounded-lg " />
    <div>
      <h1 className="text-xl lg:text-6xl font-bold text-black"><span className='text-[#ff0000]'></span> Embrace Compassion: Rescue a Pet, Change a Life!</h1>
      <p className="py-6 text-sm lg:text-xl">Make a difference in the world by opening your heart and home to a shelter animal. </p>
      {/* <button className="btn btn-primary">Get Started</button> */}
    </div>
  </div>
</div>
        
        </SwiperSlide>
        <SwiperSlide>
          {/* <img src={banner2} alt="" style={{ width: '100%', height: '90vh' }} /> */}
          <div className="hero min-h-screen bg-[#FBEDEC] ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={ban3} className="w-6/12 rounded-lg " />
    <div>
      <h1 className="text-xl lg:text-6xl font-bold text-black"><span className='text-[#ff0000]'></span> Discover Unconditional Love: Adopt a Pet Today! </h1>
      <p className="py-6 text-sm lg:text-xl">Find your perfect companion and bring joy to your home by choosing adoption over buying. </p>
      {/* <button className="btn btn-primary">Get Started</button> */}
    </div>
  </div>
</div>

          {/*  */}
         
        </SwiperSlide>
        <SwiperSlide>
          {/* <img src={banner1} alt="" style={{ width: '100%', height: '90vh' }} /> */}
          <div className="hero min-h-screen ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={ban4} className="w-6/12 rounded-lg " />
    <div>
      <h1 className="text-xl lg:text-6xl font-bold text-black"><span className='text-[#ff0000]'></span>Transform Lives: Choose Adoption, Choose Love!</h1>
      <p className="py-6 text-sm lg:text-xl">Make a lasting impact by adopting a rescue pet and be a part of their incredible journey toward a brighter future. </p>
      {/* <button className="btn btn-primary">Get Started</button> */}
    </div>
  </div>
</div>
         
        </SwiperSlide>
      </Swiper>
    </div>
    );
};

export default Banner;