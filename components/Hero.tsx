import React from 'react'
import FileUpload from "@/components/Fileupload";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 pt-20 pb-12 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left column - Text content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
            Clean Your NIH Data
            <span className="block mt-2">With One Click</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
            Our intelligent Eliza agents will process, clean, and standardize your datasets in just a matter of time, letting you focus on what matters most - your research.
          </p>

          <div className="hidden lg:block">
            <div className="inline-flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-600">Fast Processing</span>
              </div>

              <div className="flex items-center space-x-1">
                <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                <span className="text-sm text-gray-600">Standardized Output</span>
              </div>

              <div className="flex items-center space-x-1">
                <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
                <span className="text-sm text-gray-600">Data Validation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - File upload component */}
        <div className="flex-1 w-full max-w-md mx-auto">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-purple-200 blur-xl opacity-70"></div>
            <div className="absolute -bottom-8 -right-8 h-16 w-16 rounded-full bg-pink-200 blur-xl opacity-70"></div>

            {/* The actual FileUpload component */}
            <div className="relative z-10">
              <FileUpload />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="mt-16 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V100.97C50.18,88.95,102.84,77.05,158.78,65.52,232.18,51.37,291.56,67.68,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </div>
  )
}

export default Hero
