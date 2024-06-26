// import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
// import { useState } from 'react'
// import Register from './Register'

// export default function Login() {
//   let [isOpen, setIsOpen] = useState(false)

//   function open() {
//     setIsOpen(true)
//   }

//   function close() {
//     setIsOpen(false)
//   }

//   return (
//     <>
//       <Button onClick={open}>
//         Đăng nhập
//       </Button>

//       <Transition appear show={isOpen}>
//         <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
//           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//             <div className="flex h-full items-center justify-center p-4">
//               <TransitionChild
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 transform-[scale(95%)]"
//                 enterTo="opacity-100 transform-[scale(100%)]"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 transform-[scale(100%)]"
//                 leaveTo="opacity-0 transform-[scale(95%)]"
//               >
//                 <DialogPanel className="w-full max-w-5xl h-full  rounded-xl bg-white/5 p-6 backdrop-blur-3xl ">
//                   <DialogTitle as="h3" className="text-base/7 font-medium text-white ">
//                     Payment successful
//                   </DialogTitle>
//                   {/* Container */}
//                     <div className="flex flex-wrap min-h-screen w-full content-center justify-center ">
//                       {/* Login component */}
//                       <div className="flex shadow-md">
//                         {/* Login form */}
//                         <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{width: '24rem', height: '32rem'}}>
//                           <div className="w-72">
//                             {/* Heading */}
//                             <h1 className="text-xl font-semibold">Welcome back</h1>
//                             <small className="text-gray-400">Welcome back! Please enter your details</small>
//                             {/* Form */}
//                             <form className="mt-4">
//                               <div className="mb-3">
//                                 <label className="mb-2 block text-xs font-semibold">Email</label>
//                                 <input type="email" placeholder="Enter your email" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
//                               </div>
//                               <div className="mb-3">
//                                 <label className="mb-2 block text-xs font-semibold">Password</label>
//                                 <input type="password" placeholder="*****" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
//                               </div>
//                               <div className="mb-3 flex flex-wrap content-center">
//                                 <input id="remember" type="checkbox" className="mr-1 checked:bg-purple-700" /> <label htmlFor="remember" className="mr-auto text-xs font-semibold">Remember for 30 days</label>
//                                 <a href="#" className="text-xs font-semibold text-purple-700">Forgot password?</a>
//                               </div>
//                               <div className="mb-3">
//                                 <button className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">Sign in</button>
//                                 <button className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md">
//                                   <img className="w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" />
//                                   Sign in with Google
//                                 </button>
//                               </div>
//                             </form>
//                             {/* Footer */}
//                             <div className="text-center">
//                               <span className="text-xs text-gray-400 font-semibold">Don't have account?</span>
//                               <a className="text-xs font-semibold text-purple-700">{<Register/>}</a>
//                             </div>
//                           </div>
//                         </div>
//                         {/* Login banner */}
//                         <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{width: '24rem', height: '32rem'}}>
//                           <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="https://i.imgur.com/9l1A4OS.jpeg" />
//                         </div>
//                       </div>
//                       {/* Credit */}
//                       <div className="mt-3 w-full">
//                         <p className="text-center">Made by Bao</p>
//                       </div>
//                     </div>
//                 </DialogPanel>
//               </TransitionChild>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   )
// }