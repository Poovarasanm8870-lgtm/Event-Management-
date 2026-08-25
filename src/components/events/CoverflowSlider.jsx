import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Calendar, MapPin, Sparkles, ArrowRight, Ticket } from 'lucide-react';

export const CoverflowSlider = ({ events, onRegisterClick }) => {
  const featuredList = events.filter((e) => e.featured).concat(events.slice(0, 3));
  // Remove duplicates
  const uniqueFeatured = Array.from(new Set(featuredList.map(a => a.id)))
    .map(id => featuredList.find(a => a.id === id));

  return (
    <div className="relative py-6 w-full max-w-6xl mx-auto">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-80 bg-gradient-to-tr from-violet-200/40 via-indigo-200/30 to-cyan-200/40 blur-[120px] pointer-events-none rounded-full" />

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        speed={800}
        loop={uniqueFeatured.length > 2}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        className="coverflow-swiper max-w-full pb-14 pt-4"
      >
        {uniqueFeatured.map((event) => (
          <SwiperSlide key={event.id} className="w-[320px] sm:w-[450px] md:w-[600px]">
            <div className="group relative rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xl transition-all duration-500 hover:border-violet-300">
              
              {/* Image with overlay */}
              <div className="relative h-[320px] sm:h-[380px] w-full overflow-hidden bg-slate-100">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              </div>

              {/* Slide Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/90 text-violet-700 border border-slate-200 backdrop-blur-md flex items-center gap-1.5 shadow-xs uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                    {event.category}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-sm font-extrabold bg-slate-900 text-white shadow-md">
                    ₹{event.price}
                  </span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white line-clamp-2 leading-tight group-hover:text-violet-200 transition-colors">
                    {event.title}
                  </h2>

                  <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-violet-300" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-cyan-300" />
                      {event.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => onRegisterClick(event)}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-violet-500/25 flex items-center gap-2 hover:scale-105 active:scale-95"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>Book Pass</span>
                    </button>

                    <Link
                      to={`/events/${event.id}`}
                      className="px-5 py-3 rounded-2xl bg-white/90 border border-slate-200 text-slate-900 hover:bg-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 text-violet-600" />
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
