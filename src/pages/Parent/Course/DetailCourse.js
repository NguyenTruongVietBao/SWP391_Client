import { Button } from '@headlessui/react';
import React from 'react';
import './DetailCourse.css'
export default function DetailCourse() {
  return (
    <div className="bg-white pb-10 mt-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Left*/}
          <div className="ml-10">
            <div className="text-base leading-7 text-gray-700">
              <p className="text-base font-semibold leading-7 text-yellow-400">
                Chi tiết khóa học
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Toán lớp 1
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  - <strong>Chương trình toán lớp 1</strong> thường tập trung vào những khái niệm cơ bản và nền tảng nhất, giúp học sinh làm quen với các số và phép tính đơn giản
                </p>
                <p className="mt-6 ml-5">
                Chương trình toán lớp 1 thường tập trung vào những khái niệm cơ bản và nền tảng nhất, giúp học sinh làm quen với các số và phép tính đơn giản

                </p>
                <p className="mt-6 ml-5">
                Chương trình toán lớp 1 thường tập trung vào những khái niệm cơ bản và nền tảng nhất, giúp học sinh làm quen với các số và phép tính đơn giản
  
                </p>
              </div>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-8 border-t border-gray-900/10 pt-10">
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600">
                  Đội ngũ giảng viên
                </dt>
                <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                  end of 2023
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600">
                  Số lượng học viên
                </dt>
                <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                  uncounted
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold leading-6 text-gray-600">
                  Chất lượng đào tạo
                </dt>
                <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                  $1.5K
                </dd>
              </div>
            </dl>
          </div>
          
          {/* Right */}
          <div className="ml-20 lg:pr-4 mt-3">
            <div className="relative overflow-hidden rounded-3xl px-6 pb-9 pt-10 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
              <div className="absolute inset-0 mix-blend-multiply" />
              <div
                className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-40"
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                />
                <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#E8FFD9] to-[rgba(153,229,219,1)]" />
              </div>
              {/* <img className="relative rounded-2xl" src='/assets/Logo.png' alt='course'/> */}
              <iframe
                className="relative rounded-2xl"
                width="420"
                height="237"
                src="https://www.youtube.com/embed/rJabgOChWiM?list=RD-Ur6nekzM4Q"
                title="Khóa Ly Biệt - Voi Bản Đôn | The Masked Singer Vietnam 2023 [Audio Lyric]"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
              <figure className="relative isolate">
                <svg
                  viewBox="0 0 162 128"
                  fill="none"
                  aria-hidden="true"
                  className="absolute -left-2 -top-4 -z-10 h-32 stroke-white/20"
                >
                  <path
                    id="0ef284b8-28c2-426e-9442-8655d393522e"
                    d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                  />
                  <use href="#0ef284b8-28c2-426e-9442-8655d393522e" x={86} />
                </svg>

                <section
                  aria-labelledby="sale-heading"
                  class="relative mx-auto flex max-w-7xl flex-col my-7 items-center text-start sm:px-6 lg:px-8"
                >
                  <div class="mx-auto max-w-2xl lg:max-w-none">
                    <h2
                      id="sale-heading"
                      class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                    >
                      love 1
                    </h2>
                  </div>
                </section>
                <div className="flex items-center justify-center gap-32 ">
                    <div>
                      <h1 className='line-through text-lg '>1.000.000 VND</h1>                  
                      <h1 className='text-2xl font-bold text-red-500'>500.000 VND</h1>
                    </div> 
                    <div>
                      <button className="button-30">Học ngay</button>
                    </div>                 
                </div>              
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}