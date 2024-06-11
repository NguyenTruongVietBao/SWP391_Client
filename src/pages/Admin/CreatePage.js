import React from 'react'
import Menu from '../../components/Admin/Menu'

export default function CreatePage() {
  return (
    <div className="antialiased w-full min-h-screen text-slate-100 relative py-4" style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}>
        <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
            {/* Menu */}
            <Menu/>
            {/* Content */}
            <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
                <div className="bg-stone-600 flex items-center justify-center p-12 " style={{ backgroundImage: 'url("/assets/admin-wallpaper.png")' }}>
                    <div className="mx-auto w-full max-w-[550px]">
                        <div className='text-6xl font-bold text-center mb-10'>Create user</div>
                        <form action="https://formbold.com/s/FORM_ID" method="POST">
                        <div className="flex justify-between mb-5">
                            <div>
                                <label htmlFor="name" className="mb-3 block text-base font-medium text-white">
                                    First Name
                                </label>
                                <input type="text" name="name" id="name" placeholder="Full Name" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                            <div>
                                <label htmlFor="name" className="mb-3 block text-base font-medium text-white">
                                    Last Name
                                </label>
                                <input type="text" name="name" id="name" placeholder="Full Name" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>
                        <div className="flex justify-between mb-5">
                            <div>
                                <label htmlFor="name" className="mb-3 block text-base font-medium text-white">
                                    Username
                                </label>
                                <input type="text" name="name" id="name" placeholder="Full Name" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                            <div>
                                <label htmlFor="name" className="mb-3 block text-base font-medium text-white">
                                    Password
                                </label>
                                <input type="text" name="name" id="name" placeholder="Full Name" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-white">
                                Email 
                            </label>
                            <input type="email" name="email" id="email" placeholder="example@domain.com" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-white">
                                Phone 
                            </label>
                            <input type="email" name="email" id="email" placeholder="example@domain.com" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="subject" className="mb-3 block text-base font-medium text-white">
                                Address
                            </label>
                            <input type="text" name="subject" id="subject" placeholder="Enter your subject" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <label htmlFor="subject" className="mb-3 block text-base font-medium text-white">
                            Role
                        </label>
                        <div className='flex justify-between mb-5 items-center'>
                            <div class="flex">
                                <input type="radio" id="choose-me" class="peer hidden" name="role" />
                                <label for="choose-me" class="select-none cursor-pointer rounded-lg border-2 border-gray-200
                                    py-3 px-4 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 ">CONTENT MANAGER</label>
                            </div>
                            <div class="flex">
                                <input type="radio" id="choose-me1" class="peer hidden" name="role" />
                                <label for="choose-me1" class="select-none cursor-pointer rounded-lg border-2 border-gray-200
                                    py-3 px-4 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 ">MANAGER</label>
                            </div>
                            <div class="flex">
                                <input type="radio" id="choose-me2" class="peer hidden" name="role" />
                                <label for="choose-me2" class="select-none cursor-pointer rounded-lg border-2 border-gray-200
                                    py-3 px-4 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 ">PARENT</label>
                            </div>
                            <div class="flex">
                                <input type="radio" id="choose-me3" class="peer hidden" name="role" />
                                <label for="choose-me3" class="select-none cursor-pointer rounded-lg border-2 border-gray-200
                                    py-3 px-4 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 ">STUDENT</label>
                            </div>
                        </div>

                        {/* <div className="mb-5">
                            <label htmlFor="message" className="mb-3 block text-base font-medium text-white">
                            Message
                            </label>
                            <textarea rows={4} name="message" id="message" placeholder="Type your message" className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" defaultValue={""} />
                        </div> */}
                        <div>
                            <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                            Submit
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
